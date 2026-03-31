"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

const STATS_NUMS = [
  { num: 15, suffix: "+" },
  { num: 1200, suffix: "+" },
  { num: 94, suffix: "%" },
  { num: 300, suffix: "+" },
];

export default function Sobre() {
  const t = useTranslations("sobre");
  const diferenciais = t.raw("diferenciais") as string[];
  const stats = t.raw("stats") as Array<{ label: string }>;

  return (
    <section id="sobre" aria-label="Sobre o profissional" className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="reveal-left order-2 lg:order-1">
          <div className="relative">
            <div className="relative w-full max-w-[420px] mx-auto">
              <div className="aspect-square bg-slate overflow-hidden" style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}>
                <Image src="/images/legal-agreement-handshake.jpg" alt={t("photoAlt")} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 border border-gold/25 pointer-events-none" style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }} />
              <div className="absolute inset-0 border border-gold/10 pointer-events-none translate-x-4 translate-y-4 -z-10" style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }} />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="section-label reveal">{t("sectionLabel")}</p>
          <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-6 leading-tight reveal">
            {t("title1")}<br /><span className="text-gold">{t("title2")}</span>
          </h2>
          <p className="text-muted leading-relaxed mb-4 reveal" style={{ fontSize: "1rem" }}>{t("p1")}</p>
          <p className="text-muted leading-relaxed mb-8 reveal" style={{ fontSize: "1rem" }}>{t("p2")}</p>
          <ul className="flex flex-col gap-3 mb-10" role="list">
            {diferenciais.map((d, i) => (
              <li key={i} className="reveal flex items-start gap-3" style={{ transitionDelay: `${i * 80}ms` }}>
                <svg className="text-gold flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                <span className="text-[14px] text-muted leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-20 bg-gold/10 rounded overflow-hidden" role="group" aria-label="Estatísticas profissionais">
        {STATS_NUMS.map((s, i) => (
          <div key={i} className="reveal bg-surface flex flex-col items-center justify-center py-10 px-6 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
            <span className="font-number italic text-gold block mb-2" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }} data-count-up data-target={s.num} data-suffix={s.suffix} aria-label={`${s.num}${s.suffix} ${stats[i]?.label}`}>
              0{s.suffix}
            </span>
            <span className="text-[12px] text-muted tracking-wide uppercase leading-relaxed">{stats[i]?.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
