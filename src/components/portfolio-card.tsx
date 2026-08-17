"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { PortfolioProject } from "@/lib/portfolio"

export function PortfolioCard({ project, language, index = 0 }: { project: PortfolioProject; language: "es" | "en"; index?: number }) {
  const content = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/10 transition-colors hover:border-fuchsia-400/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-white/10 bg-slate-950/85 px-4 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <Image src={project.image} alt={`Vista del proyecto ${project.title}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover pt-8 transition-transform duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300">{project.sector}</p>
          {project.href && <ExternalLink className="h-4 w-4 text-white/45 transition-colors group-hover:text-fuchsia-300" aria-hidden="true" />}
        </div>
        <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-300">{project.description[language]}</p>
        <div className="flex flex-wrap gap-2">
          {project.services[language].map((service) => <span key={service} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-slate-200">{service}</span>)}
        </div>
      </div>
    </motion.article>
  )

  return project.href ? <Link href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full" aria-label={`${project.title} — ${language === "es" ? "abrir proyecto" : "open project"}`}>{content}</Link> : content
}
