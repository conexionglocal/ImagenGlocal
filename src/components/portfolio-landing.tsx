"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Bot, Compass, Search, Sparkles, Target } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { portfolioProjects } from "@/lib/portfolio"
import { PortfolioCard } from "@/components/portfolio-card"

const filters = ["all", "seo", "geo", "ux", "commerce", "ai"] as const
type Filter = (typeof filters)[number]

export function PortfolioLanding() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<Filter>("all")
  const visibleProjects = filter === "all" ? portfolioProjects : portfolioProjects.filter((project) => project.tags.includes(filter))

  const copy = language === "es"
    ? {
        eyebrow: "Portafolio · SEO · GEO · UX/UI",
        title: "Creamos presencia digital que se encuentra, se entiende y convierte.",
        description: "Unimos estrategia de marca, diseño, tecnología y optimización para buscadores y motores generativos. Cada proyecto traduce una necesidad comercial en una experiencia clara, memorable y lista para crecer.",
        primary: "Solicitar análisis de ADN",
        secondary: "Hablar de mi proyecto",
        projects: "Proyectos seleccionados",
        projectsDescription: "Sin métricas infladas ni plantillas repetidas: soluciones construidas alrededor de cada sector, audiencia y objetivo.",
        all: "Todos",
        seo: "SEO",
        geo: "GEO",
        ux: "UX/UI",
        commerce: "E-commerce",
        ai: "IA",
        methodEyebrow: "Nuestro enfoque",
        methodTitle: "De ser visible a ser la opción elegida",
        closingTitle: "Tu marca también puede ser el próximo caso que destaque.",
        closingDescription: "Comienza con un diagnóstico de ADN: revisamos posicionamiento, narrativa, experiencia, SEO/GEO y oportunidades de conversión.",
      }
    : {
        eyebrow: "Portfolio · SEO · GEO · UX/UI",
        title: "We build a digital presence that gets found, understood, and chosen.",
        description: "We combine brand strategy, design, technology, and optimization for search and generative engines. Every project turns a commercial need into a clear, memorable experience ready to grow.",
        primary: "Request a Brand DNA analysis",
        secondary: "Discuss my project",
        projects: "Selected projects",
        projectsDescription: "No inflated metrics or recycled templates: solutions built around each industry, audience, and objective.",
        all: "All",
        seo: "SEO",
        geo: "GEO",
        ux: "UX/UI",
        commerce: "E-commerce",
        ai: "AI",
        methodEyebrow: "Our approach",
        methodTitle: "From being visible to being the chosen option",
        closingTitle: "Your brand can be the next case that stands out.",
        closingDescription: "Start with a Brand DNA diagnostic: we review positioning, narrative, experience, SEO/GEO, and conversion opportunities.",
      }

  const methods = language === "es"
    ? [
        { icon: Search, title: "Encuentra", text: "SEO técnico, arquitectura semántica y contenido útil para búsquedas con intención." },
        { icon: Bot, title: "Responde", text: "Entidades, contexto y respuestas claras para asistentes y motores generativos." },
        { icon: Target, title: "Convierte", text: "Diseño, mensajes y llamados a la acción que reducen fricción y generan oportunidades." },
      ]
    : [
        { icon: Search, title: "Get found", text: "Technical SEO, semantic architecture, and useful content for intent-driven searches." },
        { icon: Bot, title: "Answer", text: "Entities, context, and clear answers for assistants and generative engines." },
        { icon: Target, title: "Convert", text: "Design, messaging, and calls to action that reduce friction and create opportunities." },
      ]

  return (
    <main className="bg-slate-950 text-white">
      <section className="relative min-h-[86vh] overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[url('/brand/hero-bg.jpg')] bg-cover bg-center opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/75 to-slate-950" />
        <div className="absolute right-[8%] top-28 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[100px]" aria-hidden="true" />
        <div className="container relative mx-auto flex min-h-[72vh] items-center px-4 py-16">
          <div className="max-w-5xl">
            <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-300"><Sparkles className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}</p>
            <h1 className="max-w-5xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">{copy.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">{copy.description}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/#brand-dna" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/20">{copy.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-semibold backdrop-blur transition hover:border-fuchsia-300/60 hover:bg-white/15">{copy.secondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300"><Compass className="h-4 w-4" aria-hidden="true" />{copy.projects}</p>
            <h2 className="text-3xl font-bold md:text-5xl">{copy.projects}</h2>
            <p className="mt-5 text-lg text-slate-300">{copy.projectsDescription}</p>
          </div>
          <div className="mb-10 flex flex-wrap gap-2" aria-label={language === "es" ? "Filtrar proyectos" : "Filter projects"}>
            {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === item ? "border-fuchsia-300 bg-fuchsia-400 text-slate-950" : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30"}`}>{copy[item]}</button>)}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => <PortfolioCard key={project.slug} project={project} language={language} index={index} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.035] py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">{copy.methodEyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold md:text-5xl">{copy.methodTitle}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {methods.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-7"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary"><Icon className="h-6 w-6" aria-hidden="true" /></div><p className="mb-2 text-xs font-bold tracking-[0.18em] text-fuchsia-300">0{index + 1}</p><h3 className="text-2xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-slate-300">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 text-center">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" aria-hidden="true" />
        <div className="container relative mx-auto px-4">
          <h2 className="mx-auto max-w-4xl text-3xl font-bold md:text-6xl">{copy.closingTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">{copy.closingDescription}</p>
          <Link href="/#brand-dna" className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 font-bold text-white shadow-xl shadow-fuchsia-950/40 transition hover:-translate-y-0.5">{copy.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}
