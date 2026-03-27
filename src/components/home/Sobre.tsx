const DIFERENCIAIS = [
  'Atendimento personalizado e confidencial em todas as etapas',
  'Estratégia jurídica construída com base nos detalhes do seu caso',
  'Comunicação clara e transparente — sem juridiquês',
  'Presença ativa nos tribunais de SP e instâncias superiores',
];

const STATS = [
  { num: 15, suffix: '+', label: 'Anos de experiência' },
  { num: 1200, suffix: '+', label: 'Casos encerrados' },
  { num: 94, suffix: '%', label: 'Taxa de êxito' },
  { num: 300, suffix: '+', label: 'Clientes ativos' },
];

export default function Sobre() {
  return (
    <section
      id="sobre"
      aria-label="Sobre o profissional"
      className="py-24 max-w-7xl mx-auto px-6 lg:px-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Image */}
        <div className="reveal-left order-2 lg:order-1">
          <div className="relative">
            {/* Geometric gold frame */}
            <div className="relative w-full max-w-[420px] mx-auto">
              <div
                className="aspect-square bg-slate overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              >
                {/* Replace with: <Image src="/foto-advogado.jpg" alt="Dr. Henrique Cavalcante em seu escritório" fill className="object-cover" /> */}
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="0.5"
                    opacity="0.15"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              {/* Gold frame overlay */}
              <div
                className="absolute inset-0 border border-gold/25 pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              />
              {/* Offset shadow frame */}
              <div
                className="absolute inset-0 border border-gold/10 pointer-events-none translate-x-4 translate-y-4 -z-10"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="section-label reveal">Sobre</p>
          <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-6 leading-tight reveal">
            Advocacia que une<br />
            <span className="text-gold">técnica e estratégia</span>
          </h2>
          <p className="text-muted leading-relaxed mb-4 reveal" style={{ fontSize: '1rem' }}>
            Sou o Dr. Henrique Cavalcante, advogado criminalista e empresarial com mais de 15 anos
            dedicados à defesa de pessoas e empresas nos tribunais de São Paulo e no Superior
            Tribunal de Justiça.
          </p>
          <p className="text-muted leading-relaxed mb-8 reveal" style={{ fontSize: '1rem' }}>
            Meu trabalho começa muito antes da audiência — na análise cuidadosa de cada detalhe do
            caso, na construção de uma tese sólida e na antecipação de cada movimento da parte
            contrária. Resultado não é sorte. É preparação.
          </p>

          {/* Diferenciais */}
          <ul className="flex flex-col gap-3 mb-10" role="list">
            {DIFERENCIAIS.map((d, i) => (
              <li
                key={i}
                className="reveal flex items-start gap-3"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <svg
                  className="text-gold flex-shrink-0 mt-0.5"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[14px] text-muted leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-20 bg-gold/10 rounded overflow-hidden"
        role="group"
        aria-label="Estatísticas profissionais"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="reveal bg-surface flex flex-col items-center justify-center py-10 px-6 text-center"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span
              className="font-number italic text-gold block mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1 }}
              data-count-up
              data-target={s.num}
              data-suffix={s.suffix}
              aria-label={`${s.num}${s.suffix} ${s.label}`}
            >
              0{s.suffix}
            </span>
            <span className="text-[12px] text-muted tracking-wide uppercase leading-relaxed">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
