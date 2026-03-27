'use client';
import { useState } from 'react';

const FAQS = [
  {
    pergunta: 'Como funciona a primeira consulta?',
    resposta:
      'A primeira consulta é confidencial e serve para compreender os detalhes do seu caso. Após a análise, apresento uma estratégia clara, o prazo estimado e as opções disponíveis. Você decide como prosseguir sem qualquer comprometimento antecipado.',
  },
  {
    pergunta: 'Quanto tempo demora um processo criminal?',
    resposta:
      'A duração varia conforme a complexidade do caso, o tribunal competente e a carga de trabalho do juízo. Processos mais simples podem ser resolvidos em meses; casos complexos podem levar anos. O que posso garantir é que atuarei para acelerar ao máximo sem comprometer a qualidade da defesa.',
  },
  {
    pergunta: 'Qual a diferença entre advocacia preventiva e contenciosa?',
    resposta:
      'A advocacia preventiva atua antes do surgimento do conflito — revisão de contratos, compliance, estruturação de negócios — para evitar litígios. A contenciosa atua quando o conflito já existe, em processos judiciais ou administrativos. A prevenção é sempre mais econômica e eficiente.',
  },
  {
    pergunta: 'Você atende por videoconferência?',
    resposta:
      'Sim. Atendo clientes de todo o Brasil e do exterior por videoconferência com a mesma qualidade do atendimento presencial. Para casos que exigem presença em tribunais de São Paulo, estou disponível para comparecer pessoalmente.',
  },
  {
    pergunta: 'Como são cobrados os honorários advocatícios?',
    resposta:
      'Os honorários são definidos caso a caso, conforme a complexidade, o tempo estimado e os recursos necessários. Trabalho com honorários fixos, por hora ou com êxito (em casos específicos). Tudo é discutido com transparência antes de qualquer contratação.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="Perguntas frequentes"
      className="py-24 bg-primary"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <p className="section-label reveal">FAQ</p>
        <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-16 leading-tight reveal">
          Perguntas frequentes
        </h2>

        <div className="flex flex-col" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                role="listitem"
                className="reveal border-b border-gold/15"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-body font-medium text-ivory text-[15px] leading-snug group-hover:text-gold transition-colors duration-200">
                    {faq.pergunta}
                  </span>
                  <span
                    className="flex-shrink-0 text-gold text-xl leading-none transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <p className="text-muted text-[14px] leading-relaxed pb-6 pr-8">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
