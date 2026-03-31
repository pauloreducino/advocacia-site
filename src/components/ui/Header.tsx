"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/lib/navigation";
import { getWhatsAppUrl } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const tHero = useTranslations("hero");
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: t("areas"), href: "/#especialidades" },
    { label: t("sobre"), href: "/#sobre" },
    { label: t("resultados"), href: "/#resultados" },
    { label: t("blog"), href: "/blog" },
    { label: t("contato"), href: "/#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const anchorId = href.slice(1);
      if (pathname !== "/") {
        router.push(("/" + anchorId) as any);
        return;
      }
      setTimeout(() => {
        const el = document.querySelector(anchorId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/85 backdrop-blur-md border-b border-gold/20"
            : "bg-transparent"
        }`}
        style={{ borderBottomWidth: scrolled ? "1px" : "0" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-display text-[17px] text-ivory tracking-wide">
              Dr. Henrique Cavalcante
            </span>
            <span className="text-[10px] text-gold tracking-[3px] uppercase mt-0.5">
              Advocacia Criminal & Empresarial
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.href}
                  onClick={() => handleAnchor(link.href)}
                  className="nav-link text-[11px] text-muted hover:text-gold tracking-[2px] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="nav-link text-[11px] text-muted hover:text-gold tracking-[2px] uppercase transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="flex items-center gap-3 pl-4 border-l border-gold/20">
              <LanguageSwitcher />
              <a
                href={getWhatsAppUrl(tHero("whatsappMsg"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ctaAriaLabel")}
                className="border border-gold text-gold text-[11px] tracking-[1.5px] uppercase px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors duration-200"
              >
                {t("cta")}
              </a>
            </div>
          </nav>

          <button
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-deep flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label={t("mobileMenuAriaLabel")}
      >
        <nav className="flex flex-col gap-8">
          {NAV_LINKS.map((link, i) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.href}
                onClick={() => handleAnchor(link.href)}
                className="text-left font-display text-3xl text-ivory hover:text-gold transition-colors duration-200 border-none bg-transparent cursor-pointer"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href as any}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-200"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="pt-4 border-t border-gold/20 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-gold tracking-[2px] uppercase">{t("language")}</span>
              <LanguageSwitcher />
            </div>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold text-sm tracking-widest uppercase px-6 py-3 rounded-sm text-center hover:bg-gold/10 transition-colors"
            >
              {t("cta")}
            </a>
          </div>
        </nav>
        <p className="absolute bottom-8 left-8 text-[11px] text-muted/70 tracking-widest uppercase">
          OAB/SP 123.456
        </p>
      </div>
    </>
  );
}
