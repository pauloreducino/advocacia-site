export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '5511999999999';
export const WA_MESSAGE = process.env.NEXT_PUBLIC_WA_MESSAGE ?? 'Olá, gostaria de agendar uma consulta.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function getWhatsAppUrl(message?: string): string {
  const msg = encodeURIComponent(message ?? WA_MESSAGE);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export function getShareUrl(platform: 'twitter' | 'linkedin' | 'whatsapp', url: string, title: string): string {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encoded}`;
    default:
      return url;
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}
