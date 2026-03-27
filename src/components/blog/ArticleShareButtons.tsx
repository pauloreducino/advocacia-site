'use client';
import { useState } from 'react';
import { getShareUrl } from '@/lib/utils';

interface Props {
  title: string;
  url: string;
}

export default function ArticleShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap" aria-label="Compartilhar artigo">
      <span className="text-[11px] text-muted tracking-[2px] uppercase">Compartilhar:</span>
      {[
        {
          label: 'WhatsApp',
          href: getShareUrl('whatsapp', url, title),
          bg: '#25D366',
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L0 24l6.336-1.49A11.944 11.944 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.893 0-3.668-.523-5.185-1.433l-.372-.22-3.753.883.917-3.66-.241-.38A9.98 9.98 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
            </svg>
          ),
        },
        {
          label: 'LinkedIn',
          href: getShareUrl('linkedin', url, title),
          bg: '#0A66C2',
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          ),
        },
        {
          label: 'Twitter',
          href: getShareUrl('twitter', url, title),
          bg: '#000000',
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          ),
        },
      ].map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar no ${s.label}`}
          className="flex items-center gap-2 px-3 py-2 rounded-sm text-[11px] text-white transition-opacity hover:opacity-85"
          style={{ background: s.bg }}
        >
          {s.icon}
          <span className="hidden sm:inline">{s.label}</span>
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copiar link do artigo"
        className="flex items-center gap-2 px-3 py-2 rounded-sm text-[11px] border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        {copied ? 'Copiado!' : 'Copiar link'}
      </button>
    </div>
  );
}
