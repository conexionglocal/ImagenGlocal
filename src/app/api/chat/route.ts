import OpenAI from "openai"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

type IncomingMessage = {
  role?: unknown
  content?: unknown
}

const requestLog = new Map<string, number[]>()
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 20

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (requestLog.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS)
  recent.push(now)
  requestLog.set(ip, recent)
  return recent.length > RATE_LIMIT
}

function fallbackReply(message: string, language: "es" | "en") {
  const normalized = message.toLowerCase()
  const isSpanish = language === "es"

  if (/precio|costo|cotiz|price|cost|quote/.test(normalized)) {
    return isSpanish
      ? "Preparamos propuestas según alcance, tiempos e integraciones. Cuéntame qué necesitas o usa el formulario de contacto para solicitar una cotización."
      : "We prepare proposals based on scope, timing, and integrations. Tell me what you need or use the contact form to request a quote."
  }

  if (/web|página|sitio|e-?commerce|tienda|website|store/.test(normalized)) {
    return isSpanish
      ? "Diseñamos sitios web, landing pages, comercio electrónico e integraciones. Podemos empezar con tus objetivos, secciones necesarias y fecha ideal de lanzamiento."
      : "We design websites, landing pages, e-commerce experiences, and integrations. We can start with your goals, required sections, and ideal launch date."
  }

  if (/chat|bot|automat|inteligencia|\bia\b|\bai\b/.test(normalized)) {
    return isSpanish
      ? "Implementamos asistentes conversacionales para atención, calificación de leads y automatización. La solución se diseña según tus contenidos, canales y sistemas actuales."
      : "We implement conversational assistants for support, lead qualification, and automation. Each solution is designed around your content, channels, and current systems."
  }

  if (/ubic|cancún|cancun|guadalajara|horario|location|hours/.test(normalized)) {
    return isSpanish
      ? "Atendemos desde Cancún y Guadalajara. Nuestro horario es lunes a viernes de 9:00 a 18:00 y sábados de 10:00 a 14:00."
      : "We serve clients from Cancún and Guadalajara. Our hours are Monday through Friday, 9:00–18:00, and Saturday, 10:00–14:00."
  }

  if (/contact|whatsapp|teléfono|telefono|correo|email/.test(normalized)) {
    return isSpanish
      ? "Puedes escribir al +52 998 920 3002, enviar correo a direccion@imagen-glocal.com o completar el formulario de contacto de esta página."
      : "You can reach us at +52 998 920 3002, email direccion@imagen-glocal.com, or complete the contact form on this page."
  }

  return isSpanish
    ? "Conexión Glocal ofrece estrategia, branding, redes sociales, publicidad, desarrollo web, comercio electrónico, producción audiovisual y automatización. ¿Sobre cuál servicio te gustaría conversar?"
    : "Conexión Glocal offers strategy, branding, social media, advertising, web development, e-commerce, audiovisual production, and automation. Which service would you like to discuss?"
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 })
  }

  let body: { language?: unknown; messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const language: "es" | "en" = body.language === "en" ? "en" : "es"
  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) as IncomingMessage[] : []
  const sanitized = messages
    .filter((message) => (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
    .map((message) => ({ role: message.role as "user" | "assistant", content: (message.content as string).trim().slice(0, 800) }))
    .filter((message) => message.content.length > 0)

  const lastUserMessage = [...sanitized].reverse().find((message) => message.role === "user")?.content
  if (!lastUserMessage) {
    return NextResponse.json({ error: "message_required" }, { status: 400 })
  }

  const fallback = fallbackReply(lastUserMessage, language)
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ reply: fallback, mode: "knowledge-base" })
  }

  const transcript = sanitized.map((message) => `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`).join("\n")
  const instructions = `You are the automated website assistant for Conexión Glocal, a digital strategy and creative agency in Mexico.
Answer in ${language === "es" ? "Spanish" : "English"} using concise, warm, professional language.
The agency offers strategy, branding, social media, digital advertising, SEO, web development, e-commerce, audiovisual production, CRM/ERP consulting, and conversational automation.
Locations: Cancún, Quintana Roo, and Guadalajara, Jalisco. Contact: +52 998 920 3002 and direccion@imagen-glocal.com.
Do not invent clients, metrics, prices, guarantees, deadlines, or policies. Prices require a custom proposal.
When useful, ask one focused qualification question. For quotes or sensitive details, direct the visitor to the contact form or WhatsApp.
Never claim to be human. Do not request payment, passwords, API keys, or highly sensitive personal information.`

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 15_000, maxRetries: 1 })
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6",
      instructions,
      input: transcript,
      max_output_tokens: 350,
      store: false,
    })

    const reply = response.output_text.trim()
    return NextResponse.json({ reply: reply || fallback, mode: "openai" }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return NextResponse.json({ reply: fallback, mode: "knowledge-base" }, { headers: { "Cache-Control": "no-store" } })
  }
}
