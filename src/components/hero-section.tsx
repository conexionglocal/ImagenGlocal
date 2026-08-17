"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bot, Search, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  const capabilities = language === "es"
    ? ["SEO y GEO", "Diseño y desarrollo", "IA aplicada"]
    : ["SEO and GEO", "Design and development", "Applied AI"]

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pb-20 pt-32 text-white md:pt-36">
      <div className="absolute inset-0 bg-[url('/brand/hero-bg.jpg')] bg-cover bg-center opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/25" />
      <div className="absolute -right-24 top-28 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px]" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-300"><Sparkles className="h-4 w-4" aria-hidden="true" />{t.hero.agency}</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">{t.hero.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">{t.hero.description}</p>
            <p className="mt-6 text-base font-semibold text-white md:text-lg">{t.hero.subtitle}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {capabilities.map((capability) => <span key={capability} className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm text-slate-100 backdrop-blur">{capability}</span>)}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={() => document.getElementById("brand-dna")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/20">{t.brandDna.submitButton}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 font-semibold backdrop-blur transition hover:border-fuchsia-300/60 hover:bg-white/15">{language === "es" ? "Ver proyectos" : "View projects"}</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.15 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/25 to-violet-500/5 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950/60 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-1.5 px-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image src="/brand/technology.webp" alt={language === "es" ? "Estrategia digital y tecnología para marcas" : "Digital strategy and technology for brands"} fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }} className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-8"><Search className="h-5 w-5 text-fuchsia-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">SEO + GEO</p><p className="text-sm font-bold">{language === "es" ? "Visibilidad con intención" : "Intent-driven visibility"}</p></div></motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }} className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8"><Bot className="h-5 w-5 text-cyan-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">IA</p><p className="text-sm font-bold">{language === "es" ? "Experiencias útiles" : "Useful experiences"}</p></div></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
