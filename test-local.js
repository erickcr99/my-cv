const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Función simple para leer .env.local sin librerías extra
function loadEnv() {
    try {
        const envPath = path.resolve('.env.local');
        if (!fs.existsSync(envPath)) return {};
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                let value = match[2].trim();
                // Quitar comillas si las tiene
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                env[match[1].trim()] = value;
            }
        });
        return env;
    } catch (e) {
        return {};
    }
}

async function run() {
    console.log("🔍 Iniciando diagnóstico de Google Sheets...");

    const env = loadEnv();
    const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Buscamos la B64 primero (la nueva), si no la normal
    const keyB64 = env.GOOGLE_PRIVATE_KEY_B64;
    const keyRaw = env.GOOGLE_PRIVATE_KEY;
    const sheetId = env.GOOGLE_SHEET_ID;

    // 1. CHEQUEO DE VARIABLES
    console.log("\n1️⃣  Verificando variables en .env.local:");
    console.log(`   - Email: ${email ? "✅ Encontrado" : "❌ FALTANTE"}`);
    console.log(`   - Sheet ID: ${sheetId ? "✅ Encontrado" : "❌ FALTANTE"}`);

    if (keyB64) console.log("   - Key: ✅ Encontrada (Formato Base64)");
    else if (keyRaw) console.log("   - Key: ⚠️ Encontrada (Formato antiguo, puede fallar)");
    else console.log("   - Key: ❌ FALTANTE");

    if (!email || (!keyB64 && !keyRaw) || !sheetId) {
        console.error("\n❌ ERROR: Faltan variables. Revisa tu archivo .env.local");
        return;
    }

    // 2. PREPARAR CREDENCIALES
    let privateKey;
    try {
        if (keyB64) {
            privateKey = Buffer.from(keyB64, 'base64').toString('utf8');
            // Verificación rápida de que parece una llave RSA
            if (!privateKey.includes("BEGIN PRIVATE KEY")) {
                console.error("❌ ERROR: La decodificación Base64 no produjo una llave válida.");
                console.log("Contenido decodificado (inicio):", privateKey.substring(0, 50));
                return;
            }
        } else {
            privateKey = keyRaw.replace(/\\n/g, '\n');
        }
    } catch (e) {
        console.error("❌ ERROR al procesar la llave privada:", e.message);
        return;
    }

    // 3. INTENTO DE CONEXIÓN
    console.log("\n2️⃣  Intentando conectar con Google...");
    try {
        const auth = new google.auth.JWT({
            email: email,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Intento de lectura
        const res = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
        console.log(`   ✅ ¡ÉXITO! Conectado a la hoja: "${res.data.properties.title}"`);

        // Intento de escritura
        console.log("\n3️⃣  Intentando escribir una fila de prueba...");
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Sheet1!A:E",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[new Date().toISOString(), "DIAGNOSTICO LOCAL", "Test de conexión", "Funcionó OK", "N/A"]],
            },
        });
        console.log("   ✅ ¡ESCRITURA EXITOSA! Revisa tu Google Sheet ahora.");
        console.log("   --> Si esto funcionó aquí pero falla en Vercel, el problema es CÓMO COPIASTE las variables en Vercel.");

    } catch (error) {
        console.error("\n❌ EROOR DE CONEXIÓN:");
        console.error(`   Código: ${error.code}`);
        console.error(`   Mensaje: ${error.message}`);

        if (error.code === 403) {
            console.log("\n💡 SOLUCIÓN: El bot no tiene permiso.");
            console.log(`   Ve a tu Sheet -> Compartir -> Agrega a: ${email}`);
            console.log("   Dale rol de 'Editor'.");
        }
        if (error.code === 404) {
            console.log("\n💡 SOLUCIÓN: No encuentra la hoja.");
            console.log("   Verifica que el GOOGLE_SHEET_ID sea correcto.");
        }
        if (error.message.includes("PEM routine")) {
            console.log("\n💡 SOLUCIÓN: La llave privada está mal formateada.");
        }
    }
}

run();
