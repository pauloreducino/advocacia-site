const RESULTADOS = [
  {
    num: 94,
    suffix: '%',
    titulo: 'Taxa de êxito',
    descricao: 'Em casos criminais e empresariais encerrados nos últimos 5 anos',
  },
  {
    num: 1200,
    suffix: '+',
    titulo: 'Casos encerrados',
    descricao: 'Processos conduzidos com dedicação integral do início ao fim',
  },
  {
    num: 48,
    suffix: 'h',
    titulo: 'Tempo de resposta',
    descricao: 'Prazo máximo para retorno após contato inicial de novos clientes',
  },
  {
    num: 15,
    suffix: '+',
    titulo: 'Anos de atuação',
    descricao: 'Experiência sólida nos tribunais de SP e instâncias superiores',
  },
];

export default function Resultados() {
  return (
    <section
      id="resultados"
      aria-label="Resultados profissionais"
      className="py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="section-label reveal">Resultados</p>
            <h2 className="font-display text-3xl lg:text-4xl text-ivory leading-tight reveal">
              Números que comprovam<br />
              <span className="text-gold">a excelência</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-xs leading-relaxed reveal lg:text-right">
            Casos encerrados com êxito nos últimos 5 anos de atuação nos tribunais paulistas e instâncias superiores.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="group"
          aria-label="Dados de resultados"
        >
          {RESULTADOS.map((r, i) => (
            <div
              key={r.titulo}
              className="reveal group border border-gold/10 rounded p-8 hover:border-gold/30 transition-colors duration-300 bg-primary/50"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 pb-4 border-b border-gold/10">
                <span
                  className="font-number italic text-gold block"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 3.8rem)', lineHeight: 1 }}
                  data-count-up
                  data-target={r.num}
                  data-suffix={r.suffix}
                  aria-label={`${r.num}${r.suffix}`}
                >
                  0{r.suffix}
                </span>
              </div>
              <p className="font-display text-ivory text-[17px] mb-2">{r.titulo}</p>
              <p className="text-muted text-[13px] leading-relaxed">{r.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
