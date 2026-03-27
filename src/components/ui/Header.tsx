'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Áreas', href: '#especialidades' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-primary/85 backdrop-blur-md border-b border-gold/20'
            : 'bg-transparent'
        }`}
        style={{ borderBottomWidth: scrolled ? '1px' : '0' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-display text-[17px] text-ivory tracking-wide">
              Dr. Henrique Cavalcante
            </span>
            <span className="text-[10px] text-gold tracking-[3px] uppercase mt-0.5">
              Advocacia Criminal & Empresarial
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" role="menu">
            {NAV_LINKS.map((link) =>
              link.href.startsWith('#') ? (
                <button
                  key={link.href}
                  role="menuitem"
                  onClick={() => handleAnchor(link.href)}
                  className="nav-link text-[11px] text-muted hover:text-gold tracking-[2px] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className="nav-link text-[11px] text-muted hover:text-gold tracking-[2px] uppercase transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={getWhatsAppUrl('Olá, gostaria de uma consulta gratuita.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta gratuita via WhatsApp"
              className="border border-gold text-gold text-[11px] tracking-[1.5px] uppercase px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors duration-200"
            >
              Consulta gratuita
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-gold transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-deep flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Menu de navegação"
      >
        <nav className="flex flex-col gap-8" role="menu">
          {NAV_LINKS.map((link, i) =>
            link.href.startsWith('#') ? (
              <button
                key={link.href}
                role="menuitem"
                onClick={() => handleAnchor(link.href)}
                className="text-left font-display text-3xl text-ivory hover:text-gold transition-colors duration-200 border-none bg-transparent cursor-pointer"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-ivory hover:text-gold transition-colors duration-200"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 border border-gold text-gold text-sm tracking-widest uppercase px-6 py-3 rounded-sm text-center hover:bg-gold/10 transition-colors"
          >
            Consulta gratuita
          </a>
        </nav>
        <p className="absolute bottom-8 left-8 text-[11px] text-muted/50 tracking-widest uppercase">
          OAB/SP 123.456
        </p>
      </div>
    </>
  );
}
