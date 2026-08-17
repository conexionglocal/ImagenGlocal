"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const sectionHref = (hash: string) => pathname === "/" ? hash : `/${hash}`

  const navItems = [
    { href: sectionHref("#home"), label: t.nav.home },
    { href: sectionHref("#services"), label: t.nav.services },
    { href: sectionHref("#about"), label: t.nav.about },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: sectionHref("#plans"), label: t.nav.plans },
    { href: sectionHref("#creative-process"), label: t.nav.creativeProcess },
    { href: sectionHref("#contact"), label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Conexión Glocal - inicio">
            <Image src="/logo-dark.png" alt="Conexión Glocal" width={187} height={73} priority className="h-12 w-auto dark:hidden sm:h-14" />
            <Image src="/logo-light.png" alt="" aria-hidden="true" width={187} height={73} priority className="hidden h-12 w-auto dark:block sm:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={isMobileMenuOpen ? (language === "es" ? "Cerrar menú" : "Close menu") : (language === "es" ? "Abrir menú" : "Open menu")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-sm">
            <nav id="mobile-navigation" className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
