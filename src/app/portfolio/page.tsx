import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortfolioLanding } from "@/components/portfolio-landing"
import { portfolioProjects } from "@/lib/portfolio"
import { siteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Portafolio SEO, GEO y diseño web | Conexión Glocal",
  description: "Proyectos de estrategia digital, SEO, GEO, UX/UI, comercio electrónico, inteligencia artificial y diseño web desarrollados por Conexión Glocal.",
  alternates: { canonical: "/portfolio" },
}

const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portafolio de Conexión Glocal",
  itemListElement: portfolioProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description.es,
      image: `${siteUrl}${project.image}`,
      ...(project.href ? { url: project.href } : {}),
    },
  })),
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: portfolio JSON-LD is generated from static project data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }}
      />
      <Header />
      <PortfolioLanding />
      <Footer />
    </div>
  )
}
