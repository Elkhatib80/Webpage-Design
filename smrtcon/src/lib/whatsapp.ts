export function buildWhatsAppLink(
  message: string,
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
): string {
  const encoded = encodeURIComponent(message);
  if (typeof navigator !== 'undefined' && /iPhone|Android/i.test(navigator.userAgent)) {
    return `https://wa.me/${phone}?text=${encoded}`;
  }
  return `https://wa.me/${phone}?text=${encoded}`;
}

export const WA_MESSAGES = {
  general: "Hi smrtCON! I'd like to learn more about your construction materials.",
  quote: (category: string) =>
    `Hi smrtCON! I'm interested in getting a quote for ${category}. Can you help?`,
  canada: "Hi smrtCON! I'm a contractor in Canada looking for construction materials.",
  africa: "Hi smrtCON! I'm interested in sourcing construction materials for an African project.",
  mideast: "Hi smrtCON! I'm interested in construction materials for a Middle East project.",
};
