const DEPOIMENTOS = [
  {
    texto:
      'O Dr. Henrique atuou com precisão e discrição absoluta em um momento extremamente delicado para nossa empresa. O resultado superou todas as nossas expectativas e o processo foi resolvido em tempo recorde.',
    nome: 'Roberto M.',
    perfil: 'Empresário · Cliente há 4 anos',
    iniciais: 'RM',
  },
  {
    texto:
      'Profissionalismo impecável em cada etapa. Em um processo que parecia impossível de reverter, conseguimos um resultado favorável graças à estratégia jurídica cuidadosamente construída.',
    nome: 'Juliana C.',
    perfil: 'Diretora executiva · Cliente há 2 anos',
    iniciais: 'JC',
  },
  {
    texto:
      'Raridade encontrar um advogado que une conhecimento técnico profundo com comunicação transparente. Sei exatamente o que acontece no meu caso em todo momento. Confio completamente.',
    nome: 'Marcos A.',
    perfil: 'Sócio-fundador · Cliente há 6 anos',
    iniciais: 'MA',
  },
];

export default function Depoimentos() {
  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="py-24 bg-deep"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-label reveal">Depoimentos</p>
        <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-16 leading-tight reveal">
          O que dizem nossos clientes
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Avaliações de clientes"
        >
          {DEPOIMENTOS.map((d, i) => (
            <div
              key={d.nome}
              role="listitem"
              className="reveal relative bg-white/[0.03] border border-gold/10 rounded p-8 hover:border-gold/20 transition-colors duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Large quote mark */}
              <span
                className="absolute top-4 left-5 font-number italic text-gold select-none pointer-events-none"
                style={{ fontSize: '5rem', opacity: 0.1, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Testimonial text */}
              <p
                className="relative z-10 text-ivory/85 text-[14px] leading-relaxed italic mb-7 pt-5"
              >
                {d.texto}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-gold/30 mb-5" aria-hidden="true" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full border border-gold/35 bg-slate flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display text-gold text-[11px] font-bold">{d.iniciais}</span>
                </div>
                <div>
                  <p className="text-ivory text-[13px] font-medium">{d.nome}</p>
                  <p className="text-muted text-[11px]">{d.perfil}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
