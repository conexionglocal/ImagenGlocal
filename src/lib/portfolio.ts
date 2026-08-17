export type PortfolioProject = {
  slug: string
  title: string
  sector: string
  image: string
  href?: string
  featured?: boolean
  tags: Array<"seo" | "geo" | "ux" | "web" | "commerce" | "ai">
  description: {
    es: string
    en: string
  }
  services: {
    es: string[]
    en: string[]
  }
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "hit-seguros",
    title: "HIT Seguros y Fianzas",
    sector: "Insurtech",
    image: "/portfolio/hit-seguros.webp",
    href: "https://hitseguros.com",
    featured: true,
    tags: ["ai", "ux", "web"],
    description: {
      es: "Experiencia de cotización para seguros con una propuesta clara, acceso rápido a asesores y asistente virtual.",
      en: "Insurance quoting experience with a clear value proposition, fast advisor access, and a virtual assistant.",
    },
    services: {
      es: ["UX/UI", "Captación de leads", "Asistente con IA"],
      en: ["UX/UI", "Lead generation", "AI assistant"],
    },
  },
  {
    slug: "alcayato",
    title: "Grupo Alcayato",
    sector: "Tecnología B2B",
    image: "/portfolio/alcayato.webp",
    href: "https://alcayato.com",
    featured: true,
    tags: ["seo", "geo", "ux", "web"],
    description: {
      es: "Sitio corporativo para comunicar redes, seguridad y automatización con arquitectura orientada a soluciones.",
      en: "Corporate site for networks, security, and automation with a solution-led information architecture.",
    },
    services: {
      es: ["Estrategia B2B", "SEO/GEO", "Diseño web"],
      en: ["B2B strategy", "SEO/GEO", "Web design"],
    },
  },
  {
    slug: "telefire",
    title: "Telefire México",
    sector: "Seguridad e IBMS",
    image: "/portfolio/telefire.webp",
    featured: true,
    tags: ["seo", "geo", "ux", "web"],
    description: {
      es: "Plataforma de soluciones contra incendios y edificios inteligentes con mensajes comerciales de alta claridad.",
      en: "Fire protection and smart-building platform with clear, commercially focused messaging.",
    },
    services: {
      es: ["Arquitectura de contenido", "SEO/GEO", "Conversión B2B"],
      en: ["Content architecture", "SEO/GEO", "B2B conversion"],
    },
  },
  {
    slug: "youngsocial",
    title: "YoungSocial",
    sector: "Moda y comercio",
    image: "/portfolio/youngsocial.webp",
    featured: true,
    tags: ["commerce", "ux", "web"],
    description: {
      es: "Tienda digital de moda urbana con narrativa visual, navegación por categorías y experiencia adaptable.",
      en: "Urban fashion storefront with visual storytelling, category navigation, and a responsive experience.",
    },
    services: {
      es: ["E-commerce", "UX/UI", "Dirección visual"],
      en: ["E-commerce", "UX/UI", "Visual direction"],
    },
  },
  {
    slug: "casa-nala",
    title: "Casa Nala",
    sector: "Hospitalidad y alimentos",
    image: "/portfolio/casa-nala.webp",
    href: "https://casanala.com.mx",
    featured: true,
    tags: ["geo", "commerce", "ux", "web"],
    description: {
      es: "Flujo de pedidos y reservaciones conectado con los principales canales de entrega de comida.",
      en: "Ordering and reservation flow connected with leading food-delivery channels.",
    },
    services: {
      es: ["Comercio local", "UX transaccional", "SEO local"],
      en: ["Local commerce", "Transactional UX", "Local SEO"],
    },
  },
  {
    slug: "alberto-rodriguez",
    title: "Alberto Rodríguez Couture",
    sector: "Moda de lujo",
    image: "/portfolio/alberto-rodriguez.webp",
    href: "https://albertorodriguez.com",
    featured: true,
    tags: ["ux", "web"],
    description: {
      es: "Experiencia editorial para alta costura con una identidad sobria, visual y centrada en las colecciones.",
      en: "Editorial haute-couture experience with a refined visual identity centered on the collections.",
    },
    services: {
      es: ["Dirección de arte", "Diseño editorial", "Desarrollo responsive"],
      en: ["Art direction", "Editorial design", "Responsive development"],
    },
  },
  {
    slug: "empaques-transformados",
    title: "Empaques Transformados",
    sector: "Manufactura",
    image: "/portfolio/empaques-transformados.webp",
    tags: ["seo", "commerce", "ux", "web"],
    description: {
      es: "Catálogo de productos para empaques de alto vacío con búsqueda rápida y contacto comercial directo.",
      en: "Product catalog for high-vacuum packaging with fast search and direct commercial contact.",
    },
    services: {
      es: ["Catálogo digital", "SEO técnico", "E-commerce"],
      en: ["Digital catalog", "Technical SEO", "E-commerce"],
    },
  },
  {
    slug: "metroland",
    title: "Metroland MX",
    sector: "Datos geoespaciales",
    image: "/portfolio/metroland.webp",
    tags: ["geo", "ux", "web"],
    description: {
      es: "Interfaz cartográfica con búsqueda territorial para explorar ubicaciones de forma visual y directa.",
      en: "Map-based interface with location search for visual, direct geographic exploration.",
    },
    services: {
      es: ["Mapas interactivos", "UX de búsqueda", "Datos geográficos"],
      en: ["Interactive maps", "Search UX", "Geographic data"],
    },
  },
  {
    slug: "pilotos-vtx",
    title: "Pilotos VTX Jalisco",
    sector: "Comunidad y eventos",
    image: "/portfolio/pilotos-vtx.webp",
    href: "https://pilotosvtxjal.com",
    tags: ["ux", "web"],
    description: {
      es: "Portal de comunidad motociclista con galería, eventos, reglamento y canales de contacto.",
      en: "Motorcycle community portal with gallery, events, rules, and contact channels.",
    },
    services: {
      es: ["Identidad digital", "Comunidad", "Desarrollo web"],
      en: ["Digital identity", "Community", "Web development"],
    },
  },
  {
    slug: "digital-genius",
    title: "Digital Genius",
    sector: "Consultoría empresarial",
    image: "/portfolio/digital-genius.webp",
    tags: ["seo", "ux", "web"],
    description: {
      es: "Landing corporativa con posicionamiento directo, oferta de servicios y llamada comercial inmediata.",
      en: "Corporate landing page with direct positioning, service offer, and an immediate commercial call to action.",
    },
    services: {
      es: ["Copy de conversión", "Landing page", "Posicionamiento"],
      en: ["Conversion copy", "Landing page", "Positioning"],
    },
  },
]
