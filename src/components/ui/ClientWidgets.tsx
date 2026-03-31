'use client';
import { useEffect } from 'react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function ClientWidgets() {
  useEffect(() => {
    // Scroll progress bar
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.classList.add('visible');
            }, i * 80);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    // Revela imediatamente elementos já visíveis (ex: navegação via âncora)
    const revealInView = () => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    };
    revealInView();
    // Roda novamente após scroll suave terminar (~400ms)
    const revealTimer = setTimeout(revealInView, 400);

    // CountUp observer
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.target ?? '0', 10);
            const suffix = el.dataset.suffix ?? '';
            const duration = 1800;
            const start = performance.now();
            const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutExpo(progress);
              el.textContent = Math.round(eased * target) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-count-up]').forEach((el) => countObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      countObserver.disconnect();
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <a
        id="wa-float"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        title="Falar pelo WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L0 24l6.336-1.49A11.944 11.944 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.893 0-3.668-.523-5.185-1.433l-.372-.22-3.753.883.917-3.66-.241-.38A9.98 9.98 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
        </svg>
      </a>
    </>
  );
}
