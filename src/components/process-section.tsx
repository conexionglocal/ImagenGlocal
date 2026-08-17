"use client"

import { motion } from "framer-motion"
import { Compass, Palette, Rocket, LineChart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ProcessSection() {
  const { language } = useLanguage()

  const content = language === "es"
    ? {
        eyebrow: "Proceso creativo",
        title: "De la estrategia a resultados medibles",
        description: "Cada proyecto avanza con objetivos claros, entregables revisables y decisiones basadas en datos.",
        steps: [
          ["Descubrimiento", "Entendemos negocio, mercado, audiencia y prioridades antes de proponer."],
          ["Estrategia y diseño", "Convertimos los hallazgos en una dirección creativa y un plan de acción."],
          ["Implementación", "Construimos, publicamos e integramos cada solución con controles de calidad."],
          ["Medición y mejora", "Revisamos resultados y ajustamos la ejecución de forma continua."],
        ],
      }
    : {
        eyebrow: "Creative process",
        title: "From strategy to measurable outcomes",
        description: "Every project moves forward with clear goals, reviewable deliverables, and data-informed decisions.",
        steps: [
          ["Discovery", "We understand the business, market, audience, and priorities before proposing."],
          ["Strategy and design", "We turn findings into a creative direction and an actionable plan."],
          ["Implementation", "We build, publish, and integrate every solution with quality controls."],
          ["Measurement and improvement", "We review outcomes and continuously improve execution."],
        ],
      }

  const icons = [Compass, Palette, Rocket, LineChart]

  return (
    <section id="creative-process" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">{content.title}</h2>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.steps.map(([title, description], index) => {
            const Icon = icons[index]
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-primary mb-2">0{index + 1}</p>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
