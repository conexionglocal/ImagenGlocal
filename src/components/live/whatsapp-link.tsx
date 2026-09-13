import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/contact/whatsapp";

export function WhatsAppLink({ className = "whatsapp-link", compact = false }: { className?: string; compact?: boolean }) {
  const href = getWhatsAppUrl();
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label="Contactar a Glocal Live por WhatsApp"><MessageCircle size={17} />{compact ? null : <span>WhatsApp</span>}</a>;
}
