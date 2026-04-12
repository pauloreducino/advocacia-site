"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AUTOPLAY = 6000;

export default function Depoimentos() {
  const t = useTranslations("depoimentos");
  const items = t.raw("items") as Array<{ texto: string; nome: string; perfil: string; iniciais: string; foto?: string }>;
  const total = items.length;

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const go = useCallback((idx: number, direction: "next" | "prev") => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setActive(((idx % total) + total) % total);
      setAnimating(false);
    }, 320);
  }, [animating, total]);

  const prev = () => go(active - 1, "prev");
  const next = useCallback(() => go(active + 1, "next"), [active, go]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, AUTOPLAY);
    return () => clearTimeout(id);
  }, [active, paused, next]);

  const onDragEnd = (endX: number) => {
    if (dragStart === null) return;
    const delta = dragStart - endX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    setDragStart(null);
    setPaused(false);
  };

  const slideClass = animating
    ? dir === "next"
      ? "-translate-x-6 opacity-0"
      : "translate-x-6 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="py-14 lg:py-24 bg-deep overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label reveal">{t("sectionLabel")}</p>
          <h2 className="font-display text-3xl lg:text-4xl text-ivory leading-tight reveal">
            {t("title")}
          </h2>
        </div>

        {/* Carrossel — setas fora do card */}
        <div className="flex items-center gap-4 lg:gap-8">

          {/* Seta esquerda */}
          <button
            onClick={prev}
            aria-label={t("prev")}
            className="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-full border border-gold/25 text-muted hover:border-gold hover:text-gold transition-all duration-200 items-center justify-center"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Card */}
          <div
            className="flex-1 min-w-0 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); setDragStart(null); }}
            onMouseDown={(e) => { setDragStart(e.clientX); setPaused(true); }}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => { setDragStart(e.touches[0].clientX); setPaused(true); }}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          >
            <div
              className={`transition-all ease-in-out ${slideClass}`}
              style={{ transition: "transform 320ms ease, opacity 320ms ease" }}
            >
              {/* Card centralizado com max-width */}
              <div className="max-w-2xl mx-auto">
                <div className="relative bg-white/[0.03] border border-gold/15 rounded p-8 lg:p-10 hover:border-gold/25 transition-colors duration-300">

                  {/* Aspas decorativas */}
                  <span
                    className="absolute top-5 right-7 font-display text-gold select-none pointer-events-none leading-none"
                    style={{ fontSize: "5rem", opacity: 0.08 }}
                    aria-hidden="true"
                  >
                    &rdquo;
                  </span>

                  {/* Estrelas */}
                  <div className="flex gap-1 mb-5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="#C9A84C">
                        <path d="M6 1L7.39 4.26L11 4.73L8.5 7.14L9.18 10.73L6 9L2.82 10.73L3.5 7.14L1 4.73L4.61 4.26L6 1Z" />
                      </svg>
                    ))}
                  </div>

                  {/* Texto */}
                  <p className="relative text-ivory/80 text-[15px] leading-[1.85] italic mb-8 pr-10">
                    &ldquo;{items[active].texto}&rdquo;
                  </p>

                  {/* Separador */}
                  <div className="w-10 h-px bg-gold/25 mb-6" />

                  {/* Autor */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gold/30 bg-slate flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {items[active].foto ? (
                        <Image
                          src={items[active].foto!}
                          alt={items[active].nome}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-display text-gold text-[11px] font-bold tracking-wide">
                          {items[active].iniciais}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-ivory text-[14px] font-medium">{items[active].nome}</p>
                      <p className="text-muted text-[12px] mt-0.5">{items[active].perfil}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Seta direita */}
          <button
            onClick={next}
            aria-label={t("next")}
            className="hidden sm:flex w-10 h-10 flex-shrink-0 rounded-full border border-gold/25 text-muted hover:border-gold hover:text-gold transition-all duration-200 items-center justify-center"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

        {/* Navegação inferior */}
        <div className="flex items-center justify-center gap-5 mt-8">

          {/* Seta prev — mobile */}
          <button
            onClick={prev}
            aria-label={t("prev")}
            className="sm:hidden w-8 h-8 rounded-full border border-gold/25 text-muted flex items-center justify-center"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots — área de toque 44px, visual preservado */}
          <div className="flex items-center" role="tablist">
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={t("goTo", { n: i + 1 })}
                onClick={() => go(i, i > active ? "next" : "prev")}
                className="flex items-center justify-center w-11 h-11"
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-gold/40 hover:bg-gold/60"
                }`} />
              </button>
            ))}
          </div>

          {/* Seta next — mobile */}
          <button
            onClick={next}
            aria-label={t("next")}
            className="sm:hidden w-8 h-8 rounded-full border border-gold/25 text-muted flex items-center justify-center"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

        {/* Contador */}
        <p className="text-center text-[11px] text-muted/60 tracking-[3px] mt-3 tabular-nums">
          {String(active + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
        </p>

      </div>
    </section>
  );
}
