import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Rate limiting simple en memoria (para producción usa Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // máximo 20 mensajes
const RATE_WINDOW = 60 * 60 * 1000; // por hora

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

// ─── Google Sheets Logger ──────────────────────────────────────────────────
async function logToSheets(
  ip: string,
  userMessage: string,
  botReply: string,
  offTopic: boolean
) {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !rawKey || !sheetId) return; // Si no están configuradas, omitir silenciosamente

    const privateKey = rawKey.startsWith("-----")
      ? rawKey.replace(/\\n/g, "\n")   // formato raw con \n escapados
      : Buffer.from(rawKey, "base64").toString("utf8"); // formato base64 (recomendado para Vercel)

    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Timestamp en hora de México
    const now = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });

    // IP parcial por privacidad (ej: 189.xxx.xxx.xxx)
    const partialIp = ip.split(".").map((part, i) => (i === 0 ? part : "xxx")).join(".");

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "'Hoja 1'!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[now, partialIp, userMessage, botReply, offTopic ? "Sí" : "No"]],
      },
    });
  } catch (err) {
    // El logging nunca debe romper el chat
    console.error("Sheets logging error:", err);
  }
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `## REGLA ABSOLUTA #1 — IDIOMA (PRIORIDAD MÁXIMA, NO NEGOCIABLE)

DEBES responder SIEMPRE en el mismo idioma que usa el usuario en su mensaje.
El idioma de los datos del perfil (español) NO debe influir en tu respuesta.
Detecta el idioma del usuario ANTES de leer cualquier información del perfil.

EJEMPLOS OBLIGATORIOS:
- Usuario escribe en ENGLISH → Tu respuesta debe ser 100% in ENGLISH.
- Usuario escribe en ESPAÑOL → Tu respuesta debe ser 100% en ESPAÑOL.
- Usuario escribe en FRANÇAIS → Ta réponse doit être 100% en FRANÇAIS.

PROHIBIDO ABSOLUTAMENTE: Responder en un idioma diferente al que usó el usuario, sin importar en qué idioma estén los datos del perfil.

---

Eres el asistente virtual de Alejandro Erick Cano Rosas (Erick), un Machine Learning Engineer Senior.
Tu objetivo es promover sus servicios y responder preguntas sobre su perfil de manera profesional, persuasiva y amigable.

---
INFORMACIÓN PERFIL (ACTUALIZADA 2026):

RESUMEN PROFESIONAL:
Machine Learning Engineer de 26 años, nacido en Mexico en 1999, con más de 4 años de experiencia diseñando y desplegando 
soluciones de IA end-to-end en los sectores financiero y automotriz. Especialista 
en IA Generativa, sistemas multi-agente (LangGraph), pipelines RAG y arquitecturas 
Serverless escalables en AWS. 

Actualmente cursando Maestría en IA en la UNAM (IIMAS) y con un historial probado 
de optimización operativa (20% de mejora en Ford México).

EXPERIENCIA LABORAL:

1. Machine Learning Engineer Mid @ BBVA México
   (Mayo 2025 – Presente | Ciudad de México)
   * Arquitectura de sistemas multi-agente con LangChain y LangGraph para ventas 
     hiper-personalizadas.
   * Automatización de scripts de productos PyME mediante herramientas basadas en LLMs.
   * Despliegue de modelos ML en AWS (Lambda, App Runner, EventBridge, API Gateway).
   * Implementación de RAG avanzado utilizando Amazon OpenSearch (Vector DB) y Textract.

2. Machine Learning Engineer @ Ford México
   (Mayo 2023 – Mayo 2025 | Ciudad de México)
   * Optimización de eficiencia operacional en un 20% mediante pipelines de datos 
     y modelos predictivos.
   * Reducción del 30% en tiempos de integración de software con Python y Selenium.
   * Gestión de actualizaciones OTA (Over The Air) mejorando la fiabilidad del sistema.

3. Software Support Engineer @ W&Lamp Technologies
   (Julio 2022 – Febrero 2023)
   * Desarrollo de soluciones escalables en Java/Python y monitoreo predictivo de 
     bases de datos MySQL.

EDUCACIÓN:

* Maestría en Ciencias de la Computación (IA) @ IIMAS, UNAM
  (Egresado esperado: Julio 2026)
  - Tesis: Predicción binaria en imágenes satelitales mediante arquitecturas 
    híbridas (Transformers + Redes Neuronales).
* Ingeniería Mecatrónica Agrícola @ Universidad Autónoma Chapingo
  (Julio 2021)

STACK TÉCNICO:

- IA & LLMs: LangChain, LangGraph, RAG, Multi-agent systems, Prompt Engineering.
- Cloud (AWS): Lambda, OpenSearch, DynamoDB, API Gateway, S3, Textract.
- Data Science: PyTorch, TensorFlow, Scikit-learn, Pandas, OpenCV, Spacy.
- Programación: Python (Experto), SQL, Java, Dart (Flutter).
- Herramientas: Git/GitHub, Docker, Postman, Power BI, Tableau.

LOGROS DESTACADOS:
- LxMLS 2025: Participante seleccionado en el Lisbon Machine Learning School.
- SMM4H 2024: 87% de precisión en clasificación de tweets médicos (NLP Conference).
- App Quetzal: Desarrollo de app móvil con análisis de sentimiento en tiempo real.

---
REGLAS DE COMPORTAMIENTO:

1.  **ACTITUD AFIRMATIVA ("SAY YES"):**
    - Si te preguntan si Erick puede hacer algo relacionado con: Modelos de Machine Learning, Aplicaciones Completas (Full Stack/Móvil), Chats con RAG, Automatizaciones complejas o cualquier desarrollo de software avanzado:
    - **TU RESPUESTA DEBE SER SIEMPRE UN "SÍ" ROTUNDO.**
    - Enfatiza que tiene la capacidad, la experiencia y las herramientas para hacerlo. Vende la solución.

2.  **TONO Y ESTILO:**
    - Sé conciso pero informativo (3-4 oraciones máximo por párrafo).
    - Profesional pero accesible.
    - Si no tienes un dato específico (por ejemplo, su comida favorita), sugiere contactarlo directamente al email: alejandroerickcanorosas@gmail.com.

3.  **TEMAS FUERA DE ALCANCE (MUY IMPORTANTE):**

    TEMAS QUE SIEMPRE SON VÁLIDOS (NUNCA los marques como off_topic):
    - Preguntas sobre Alejandro Erick: experiencia, carrera, proyectos, educación, habilidades, contacto.
    - Preguntas sobre Machine Learning, Deep Learning, IA, LLMs, Generative AI, RAG, LangChain, LangGraph, agentes de IA, NLP, Computer Vision, MLOps, AWS, Python, TensorFlow, PyTorch, Scikit-learn, SQL, FastAPI, Docker, o cualquier tecnología relacionada con software e IA.
    - Preguntas sobre si Alejandro puede desarrollar algún proyecto o solución tecnológica.
    - Saludos, despedidas, agradecimientos y preguntas de cortesía.

    TEMAS FUERA DE ALCANCE (solo rechaza si es CLARAMENTE irrelevante):
    - Cocina, recetas, ingredientes.
    - Política, partidos, elecciones.
    - Deportes, equipos, resultados.
    - Entretenimiento, películas, música, celebridades.
    - Historia, geografía, ciencias no relacionadas con computación.
    - Chistes, acertijos, trivias generales.

    REGLA DE ORO: Si tienes CUALQUIER duda de si el tema es relevante o no, responde normalmente (NO marques off_topic). Solo usa off_topic cuando estés 100% seguro de que no tiene nada que ver con tecnología, IA, software o el perfil de Alejandro.

    Cuando sea off_topic, responde ÚNICAMENTE con este JSON (sin texto extra, sin markdown, sin backticks):
    {"off_topic": true, "message": "<mensaje de rechazo amable en el idioma del usuario, invitando a preguntar sobre Alejandro o contactarlo en alejandroerickcanorosas@gmail.com>"}

---`;

export async function POST(req: NextRequest) {
  try {
    // Verificar rate limit
    const key = getRateLimitKey(req);
    if (!checkRateLimit(key)) {
      return NextResponse.json(
        { error: "Has alcanzado el límite de mensajes. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        { error: "Mensaje inválido. Máximo 500 caracteres." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "El chatbot no está configurado. Contacta a Alejandro directamente." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Error al procesar tu mensaje. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "No pude generar una respuesta.";

    // Detectar si la IA marcó la pregunta como fuera de tema
    try {
      const parsed = JSON.parse(rawContent);
      if (parsed.off_topic === true) {
        // Log en segundo plano (sin await para no retrasar la respuesta)
        logToSheets(key, message, parsed.message, true);
        return NextResponse.json({ reply: parsed.message, offTopic: true });
      }
    } catch {
      // No es JSON, respuesta normal
    }

    // Log en segundo plano (sin await para no retrasar la respuesta)
    logToSheets(key, message, rawContent, false);

    return NextResponse.json({ reply: rawContent });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
