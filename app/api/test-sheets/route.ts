import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // 1. Verificar que las variables existen
    if (!email || !rawKey || !sheetId) {
        return NextResponse.json({
            ok: false,
            error: "Variables de entorno faltantes",
            missing: {
                GOOGLE_SERVICE_ACCOUNT_EMAIL: !email,
                GOOGLE_PRIVATE_KEY: !rawKey,
                GOOGLE_SHEET_ID: !sheetId,
            },
        });
    }

    try {
        const privateKey = rawKey.startsWith("-----")
            ? rawKey.replace(/\\n/g, "\n")
            : Buffer.from(rawKey, "base64").toString("utf8");

        const auth = new google.auth.JWT({
            email,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Intentar leer la hoja para verificar autenticación
        const result = await sheets.spreadsheets.get({
            spreadsheetId: sheetId,
        });

        // Si llega aquí, la autenticación funcionó
        const sheetNames = result.data.sheets?.map((s) => s.properties?.title);

        return NextResponse.json({
            ok: true,
            message: "Conexión exitosa con Google Sheets ✅",
            spreadsheetTitle: result.data.properties?.title,
            sheets: sheetNames,
            emailUsed: email,
        });
    } catch (err: any) {
        return NextResponse.json({
            ok: false,
            error: err.message,
            code: err.code,
            status: err.status,
        });
    }
}
