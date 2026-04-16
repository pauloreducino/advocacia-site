import { getTranslations } from "next-intl/server";
import CTAForm from "./CTAForm";

export default async function CTABanner() {
  const t = await getTranslations("cta");

  return (
    <section
      id="cta"
      aria-label="Chamada para ação"
      className="py-16 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('/images/Simbolos-do-Direito-e-da-Advocacia-e-seus-significados.webp')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,15,26,0.92) 0%, rgba(15,21,32,0.88) 100%)",
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gold/30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label justify-center reveal mb-6">{t("label")}</p>
        <h2
          className="font-display font-semibold text-ivory leading-tight mb-4 reveal"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          {t("title1")}
          <br />
          <span className="text-gold">{t("title2")}</span>
        </h2>
        <p className="text-muted text-[15px] reveal animate-fade-up-delayed">
          {t("description")}
        </p>

        <CTAForm />
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gold/30"
        aria-hidden="true"
      />
    </section>
  );
}
