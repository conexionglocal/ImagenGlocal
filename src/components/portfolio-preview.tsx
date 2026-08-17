"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { portfolioProjects } from "@/lib/portfolio"
import { PortfolioCard } from "@/components/portfolio-card"

export function PortfolioPreview() {
  const { language } = useLanguage()
  const copy = language === "es"
    ? { eyebrow: "Trabajo seleccionado", title: "Estrategia visible. Diseño que convierte.", description: "Una muestra de experiencias digitales construidas para marcas, industrias y audiencias distintas.", cta: "Ver portafolio completo" }
    : { eyebrow: "Selected work", title: "Visible strategy. Design that converts.", description: "A selection of digital experiences built for different brands, industries, and audiences.", cta: "View full portfolio" }

  return (
    <section id="portfolio" className="relative overflow-hidden bg-slate-950 py-24 text-white scroll-mt-20">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[110px]" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300"><Sparkles className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{copy.title}</h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">{copy.description}</p>
          </div>
          <Link href="/portfolio" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:border-fuchsia-300/60 hover:bg-white/15">{copy.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.filter((project) => project.featured).slice(0, 6).map((project, index) => <PortfolioCard key={project.slug} project={project} language={language} index={index} />)}
        </div>
      </div>
    </section>
  )
}
