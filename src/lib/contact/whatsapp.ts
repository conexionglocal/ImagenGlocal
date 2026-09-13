const DEFAULT_WHATSAPP_NUMBER = "522206392949";
const DEFAULT_WHATSAPP_MESSAGE = "Hola, quiero información sobre eventos y organización en Glocal Live.";

export function getWhatsAppUrl(message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || DEFAULT_WHATSAPP_MESSAGE) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(number)) return undefined;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
