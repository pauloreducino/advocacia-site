'use client';
import { getWhatsAppUrl } from '@/lib/utils';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Scales SVG — background element */}
      <div
        className="absolute right-[-20px] top-1/2 w-[400px] h-[500px] pointer-events-none select-none"
        style={{ color: '#C9A84C', opacity: 0.055, animation: 'scalesSway 8s ease-in-out infinite', transform: 'translateY(-50%)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <line x1="200" y1="30" x2="200" y2="455" stroke="currentColor" strokeWidth="2.5" />
          <line x1="55" y1="115" x2="345" y2="115" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="200" cy="115" r="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="55" r="6" stroke="currentColor" strokeWidth="2" />
          <line x1="200" y1="49" x2="200" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="75" y1="115" x2="75" y2="225" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="75" cy="242" rx="48" ry="14" stroke="currentColor" strokeWidth="2.2" />
          <line x1="325" y1="115" x2="325" y2="225" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="325" cy="242" rx="48" ry="14" stroke="currentColor" strokeWidth="2.2" />
          <path d="M130 455 L200 438 L270 455" stroke="currentColor" strokeWidth="2.5" />
          <line x1="130" y1="455" x2="88" y2="478" stroke="currentColor" strokeWidth="2.5" />
          <line x1="270" y1="455" x2="312" y2="478" stroke="currentColor" strokeWidth="2.5" />
          <line x1="65" y1="478" x2="335" y2="478" stroke="currentColor" strokeWidth="2.5" />
          <line x1="55" y1="115" x2="30" y2="138" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="345" y1="115" x2="370" y2="138" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen">
        {/* Content */}
        <div className="flex flex-col">
          {/* Credential line */}
          <div className="flex items-center gap-3 mb-7 animate-fade-up">
            <div className="w-8 h-px bg-gold flex-shrink-0" />
            <span className="text-[11px] text-gold tracking-[2.5px] uppercase">
              OAB/SP 123.456 &nbsp;·&nbsp; 15 anos de atuação
            </span>
            <div className="w-8 h-px bg-gold flex-shrink-0" />
          </div>

          {/* H1 */}
          <h1
            className="font-display leading-[1.15] mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              animation: 'wipeIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both',
            }}
          >
            <span className="block text-ivory">Sua defesa começa</span>
            <span className="block text-gold">com a escolha certa.</span>
          </h1>

          {/* Paragraph */}
          <p
            className="text-muted leading-relaxed max-w-[460px] mb-10 animate-fade-up-delayed"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.1rem)' }}
          >
            Advocacia criminal e empresarial de alto padrão. Estratégia, sigilo e resultados
            — do primeiro contato ao trânsito em julgado.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up-more">
            <a
              href={getWhatsAppUrl('Olá, gostaria de agendar uma consulta com o Dr. Henrique.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta via WhatsApp"
              className="bg-gold text-primary font-body font-medium text-[12px] tracking-[1.5px] uppercase px-7 py-4 rounded-sm hover:bg-gold-light transition-all duration-200 hover:scale-[1.02]"
            >
              Agendar consulta
            </a>
            <a
              href="#sobre"
              aria-label="Conheça o escritório"
              className="border border-gold text-gold font-body font-medium text-[12px] tracking-[1.5px] uppercase px-7 py-4 rounded-sm hover:bg-gold/10 transition-colors duration-200"
            >
              Conheça o escritório
            </a>
          </div>
        </div>

        {/* Photo + badges */}
        <div
          className="relative flex justify-center lg:justify-end items-end h-full"
          style={{ animation: 'fadeIn 1s ease 0.2s both' }}
        >
          <div className="relative">
            {/* Photo placeholder — replace src with actual photo */}
            <div
              className="relative w-[260px] sm:w-[300px] h-[380px] sm:h-[440px] rounded-t-sm overflow-hidden bg-slate"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.6"
                  opacity="0.2"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              {/* Decorative gold frame corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
            </div>

            {/* Floating badges — desktop only */}
            <div
              className="hidden lg:flex absolute -top-4 -right-16 items-center gap-2 bg-deep/95 border border-gold/40 rounded px-3 py-2 text-[12px] text-ivory"
              style={{ animation: 'floatY 4s ease-in-out infinite' }}
              aria-hidden="true"
            >
              <span className="text-gold text-[8px]">✦</span>
              94% de êxito
            </div>
            <div
              className="hidden lg:flex absolute top-36 -right-20 items-center gap-2 bg-deep/95 border border-gold/40 rounded px-3 py-2 text-[12px] text-ivory"
              style={{ animation: 'floatY2 5s ease-in-out 0.8s infinite' }}
              aria-hidden="true"
            >
              <span className="text-gold text-[8px]">✦</span>
              +1.200 casos
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] text-gold tracking-[2px] uppercase opacity-70">
          Rolar para conhecer
        </span>
        <svg
          className="animate-bounce-soft"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1.5"
          opacity="0.7"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
