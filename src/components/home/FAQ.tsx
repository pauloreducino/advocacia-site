'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number | null>(null);
  const items = t.raw('items') as Array<{ pergunta: string; resposta: string }>;

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  };

  return (
    <section id="faq" aria-label="Perguntas frequentes" className="py-24 bg-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <p className="section-label reveal">{t('sectionLabel')}</p>
        <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-16 leading-tight reveal">{t('title')}</h2>

        <div className="flex flex-col" role="list">
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} role="listitem" className="reveal border-b border-gold/15" style={{ transitionDelay: `${i * 60}ms` }}>
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-body font-medium text-ivory text-[15px] leading-snug group-hover:text-gold transition-colors duration-200">{faq.pergunta}</span>
                  <span className="flex-shrink-0 text-gold text-xl leading-none transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }} aria-hidden="true">+</span>
                </button>
                <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} style={{ maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p className="text-muted text-[14px] leading-relaxed pb-6 pr-8">{faq.resposta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
