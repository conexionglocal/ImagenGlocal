import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Términos y condiciones | Conexión Glocal",
  description: "Condiciones de uso del sitio de Conexión Glocal.",
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      updated="16 de agosto de 2026"
      sections={[
        { title: "Uso del sitio", paragraphs: ["Este sitio ofrece información general sobre los servicios de Conexión Glocal. Debes utilizarlo de forma lícita y sin intentar afectar su disponibilidad o seguridad."] },
        { title: "Propuestas y contratación", paragraphs: ["Los servicios, alcances, precios y fechas solo quedan confirmados mediante una propuesta o contrato aceptado por las partes. El contenido del sitio y las respuestas del asistente no constituyen una cotización vinculante."] },
        { title: "Asistente automatizado", paragraphs: ["El asistente facilita orientación inicial y puede cometer errores. No debe utilizarse para decisiones legales, financieras o de seguridad, ni para compartir datos sensibles."] },
        { title: "Propiedad intelectual", paragraphs: ["Los textos, identidad, diseño y materiales propios del sitio pertenecen a Conexión Glocal o se utilizan con autorización. No pueden reutilizarse comercialmente sin permiso."] },
        { title: "Enlaces y disponibilidad", paragraphs: ["El sitio puede incluir enlaces a plataformas externas. No garantizamos la disponibilidad permanente del sitio ni el contenido de servicios administrados por terceros."] },
      ]}
    />
  )
}
