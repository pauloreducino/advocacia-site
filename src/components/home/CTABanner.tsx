import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getWhatsAppUrl } from "@/lib/utils";

export default async function CTABanner() {
  const t = await getTranslations("cta");

  return (
    <section
      id="cta"
      aria-label="Chamada para ação"
      className="py-16 lg:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/Simbolos-do-Direito-e-da-Advocacia-e-seus-significados.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,15,26,0.88) 0%, rgba(15,21,32,0.84) 100%)",
          }}
        />
      </div>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gold/30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label justify-center reveal mb-6">{t("label")}</p>
        <h2
          className="font-display font-semibold text-ivory leading-tight mb-5 reveal"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          {t("title1")}
          <br />
          <span className="text-gold">{t("title2")}</span>
        </h2>
        <p className="text-muted text-[16px] mb-10 reveal animate-fade-up-delayed">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal animate-fade-up-more">
          <a
            href={getWhatsAppUrl(t("whatsappMsg"))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("btn1AriaLabel")}
            className="inline-flex items-center gap-3 bg-gold text-primary font-medium text-[12px] tracking-[1.5px] uppercase px-8 py-4 rounded-sm hover:bg-gold-light transition-all duration-200 hover:scale-[1.02]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L0 24l6.336-1.49A11.944 11.944 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.893 0-3.668-.523-5.185-1.433l-.372-.22-3.753.883.917-3.66-.241-.38A9.98 9.98 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
            </svg>
            {t("btn1")}
          </a>
          <a
            href="mailto:contato@escritorio.adv.br"
            aria-label={t("btn2AriaLabel")}
            className="inline-flex items-center gap-3 border border-gold/50 text-gold font-medium text-[12px] tracking-[1.5px] uppercase px-8 py-4 rounded-sm hover:bg-gold/10 transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {t("btn2")}
          </a>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gold/30"
        aria-hidden="true"
      />
    </section>
  );
}
