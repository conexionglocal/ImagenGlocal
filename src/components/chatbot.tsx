"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export function Chatbot() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const copy = language === "es"
    ? {
        title: "Asistente Glocal",
        status: "Asistente automatizado",
        greeting: "¡Hola! Puedo orientarte sobre servicios, planes, diagnóstico de marca y formas de contacto. ¿Qué necesitas?",
        placeholder: "Escribe tu pregunta…",
        open: "Abrir Asistente Glocal",
        close: "Cerrar Asistente Glocal",
        send: "Enviar mensaje",
        error: "No pude responder en este momento. Puedes escribirnos por WhatsApp al +52 998 920 3002.",
        suggestions: ["¿Qué servicios ofrecen?", "Quiero una página web", "¿Cómo solicito una cotización?"],
      }
    : {
        title: "Glocal Assistant",
        status: "Automated assistant",
        greeting: "Hello! I can help with services, plans, brand diagnostics, and contact options. What do you need?",
        placeholder: "Type your question…",
        open: "Open Glocal Assistant",
        close: "Close Glocal Assistant",
        send: "Send message",
        error: "I could not respond right now. You can reach us on WhatsApp at +52 998 920 3002.",
        suggestions: ["What services do you offer?", "I need a website", "How can I request a quote?"],
      }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  })

  const visibleMessages = messages.length > 0 ? messages : [{ role: "assistant" as const, content: copy.greeting }]

  const sendMessage = async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed || isLoading) return

    const userMessage: ChatMessage = { role: "user", content: trimmed.slice(0, 800) }
    const nextMessages = [...visibleMessages, userMessage].slice(-10)
    setMessages(nextMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, messages: nextMessages }),
      })

      if (!response.ok) throw new Error("Chat request failed")
      const data = await response.json() as { reply?: string }
      if (!data.reply) throw new Error("Chat response was empty")
      const assistantMessage: ChatMessage = { role: "assistant", content: data.reply }
      setMessages((current) => [...current, assistantMessage].slice(-10))
    } catch {
      const errorMessage: ChatMessage = { role: "assistant", content: copy.error }
      setMessages((current) => [...current, errorMessage].slice(-10))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {isOpen && (
        <section className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[70vh] rounded-2xl border bg-background shadow-2xl overflow-hidden flex flex-col" aria-label={copy.title}>
          <header className="bg-gradient-primary text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center"><Bot className="w-5 h-5" aria-hidden="true" /></div>
              <div><h2 className="font-bold">{copy.title}</h2><p className="text-xs text-white/80">{copy.status}</p></div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.close} className="p-2 rounded-full hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite">
            {visibleMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {copy.suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="text-xs px-3 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {isLoading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />{language === "es" ? "Escribiendo…" : "Typing…"}</div>}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); sendMessage(input) }} className="border-t p-3 flex gap-2">
            <label htmlFor="chat-message" className="sr-only">{copy.placeholder}</label>
            <Input ref={inputRef} id="chat-message" value={input} onChange={(event) => setInput(event.target.value)} maxLength={800} placeholder={copy.placeholder} disabled={isLoading} autoComplete="off" />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label={copy.send} className="bg-gradient-primary text-white shrink-0"><Send className="w-4 h-4" aria-hidden="true" /></Button>
          </form>
        </section>
      )}

      <button type="button" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? copy.close : copy.open} aria-expanded={isOpen} className="ml-auto w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg flex items-center justify-center hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 transition-transform">
        {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
      </button>
    </div>
  )
}
