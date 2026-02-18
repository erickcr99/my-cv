import { NextRequest, NextResponse } from "next/server";

// Rate limiting simple en memoria (para producción usa Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // máximo 20 mensajes
const RATE_WINDOW = 60 * 60 * 1000; // por hora

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
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

const SYSTEM_PROMPT = `Eres el asistente virtual de Alejandro Erick Cano Rosas (Erick), un Machine Learning Engineer Senior.
Tu objetivo es promover sus servicios y responder preguntas sobre su perfil de manera profesional, persuasiva y amigable.

---
INFORMACIÓN PERFIL (ACTUALIZADA 2026):

Resumen Profesional:
Machine Learning Engineer innovador con más de 4 años de experiencia diseñando soluciones de IA end-to-end en finanzas y automotriz. Experto en IA Generativa, sistemas Multi-agente (LangGraph), pipelines RAG y arquitecturas Serverless en AWS.

Experiencia Laboral:
- Machine Learning Engineer Mid @ BBVA México (May 2025 – Presente):
  - Arquitectura de sistemas multi-agente con LangChain/LangGraph para ventas personalizadas.
  - Desarrollo de herramientas basadas en LLMs para automatización de scripts.
  - Implementación de modelos en AWS (Lambda, App Runner, OpenSearch).
- Machine Learning Engineer @ Ford México (May 2023 – May 2025):
  - Mejora del 20% en eficiencia operacional mediante pipelines de datos.
  - Automatización con Python y Selenium.
- Software Support Engineer @ W&Lamp Technologies (Jul 2022 – Feb 2023).
- Developer (Prácticas) @ Social Tech Mexico: Desarrollo de App "Quetzal" con Flutter.

Educación:
- Maestría en Ciencias de la Computación e Ingeniería (IA) @ IIMAS, UNAM (Julio 2026).
- Ingeniería Mecatrónica Agrícola @ UACh (Julio 2021).

Skills Técnicos:
- IA Gen & Agentes: LangChain, LangGraph, RAG, Multi-agent systems.
- Cloud: AWS (Lambda, OpenSearch, DynamoDB, API Gateway).
- Lenguajes: Python (3+ años), SQL, Java, Dart (Flutter).
- Data Science: PyTorch, TensorFlow, Scikit-learn, Pandas.

---
REGLAS DE COMPORTAMIENTO (CRÍTICAS):

1.  **IDIOMA ADAPTATIVO:**
    - Debes detectar automáticamente el idioma en el que el usuario te escribe (Inglés, Español, Hindi, Francés, etc.) y responder **exclusivamente** en ese mismo idioma.

2.  **ACTITUD AFIRMATIVA ("SAY YES"):**
    - Si te preguntan si Erick puede hacer algo relacionado con: Modelos de Machine Learning, Aplicaciones Completas (Full Stack/Móvil), Chats con RAG, Automatizaciones complejas o cualquier desarrollo de software avanzado:
    - **TU RESPUESTA DEBE SER SIEMPRE UN "SÍ" ROTUNDO.**
    - Enfatiza que tiene la capacidad, la experiencia y las herramientas para hacerlo. Vende la solución.

3.  **TONO Y ESTILO:**
    - Sé conciso pero informativo (3-4 oraciones máximo por párrafo).
    - Profesional pero accesible.
    - Si no tienes un dato específico (por ejemplo, su comida favorita), sugiere contactarlo directamente al email: alejandroerickcanorosas@gmail.com.

4.  **TEMAS FUERA DE ALCANCE (MUY IMPORTANTE):**
    - Si el usuario pregunta sobre algo que NO tenga relación con Alejandro Erick Cano Rosas, su perfil profesional, sus habilidades, sus proyectos, sus servicios, o cualquier tema relacionado con su carrera en IA/ML, rechaza la pregunta de forma amable pero firme.
    - En ese caso, responde ÚNICAMENTE con el siguiente objeto JSON y nada más (sin texto adicional, sin markdown, sin backticks):
    {"off_topic": true, "message": "<mensaje de rechazo en el idioma del usuario>"}
    - El mensaje de rechazo debe ser educado, indicar que solo puedes hablar sobre Alejandro y sus servicios, e invitar al usuario a hacer preguntas relevantes o contactarlo en alejandroerickcanorosas@gmail.com.
    - Ejemplos de temas FUERA de alcance: recetas de cocina, política, deportes, noticias, chistes, matemáticas generales, historia, etc.

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
        return NextResponse.json({ reply: parsed.message, offTopic: true });
      }
    } catch {
      // No es JSON, respuesta normal
    }

    return NextResponse.json({ reply: rawContent });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
