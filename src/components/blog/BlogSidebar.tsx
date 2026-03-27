import Link from "next/link";
import type { Category, Article } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  categories: Category[];
  recentArticles: Article[];
  currentSlug?: string;
}

export default function BlogSidebar({
  categories,
  recentArticles,
  currentSlug,
}: Props) {
  return (
    <aside aria-label="Barra lateral do blog" className="flex flex-col gap-8">
      {/* Newsletter */}
      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-3">
          Newsletter
        </p>
        <p className="font-display text-ivory text-[17px] mb-2 leading-snug">
          Receba insights jurídicos
        </p>
        <p className="text-muted text-[13px] mb-5 leading-relaxed">
          Artigos sobre direito criminal, empresarial e muito mais — direto no
          seu e-mail.
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="seu@email.com"
            aria-label="Seu endereço de e-mail"
            className="w-full bg-primary border border-gold/20 text-ivory text-[13px] px-4 py-3 rounded-sm placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="button"
            className="w-full bg-gold text-primary font-medium text-[11px] tracking-[1.5px] uppercase py-3 rounded-sm hover:bg-gold-light transition-colors"
          >
            Inscrever-se
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">
          Categorias
        </p>
        <ul className="flex flex-col gap-1" role="list">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/blog?categoria=${cat.slug}`}
                scroll={false}
                className="flex items-center justify-between py-2 text-muted text-[13px] hover:text-gold transition-colors duration-200 border-b border-gold/5 last:border-0"
              >
                <span>{cat.label}</span>
                <span className="text-muted/50 text-[11px]">
                  {cat.count ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent articles */}
      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">
          Artigos recentes
        </p>
        <ul className="flex flex-col gap-4" role="list">
          {recentArticles
            .filter((a) => a.slug !== currentSlug)
            .slice(0, 4)
            .map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="group block">
                  <p className="text-[10px] text-gold tracking-[1px] uppercase mb-1">
                    {a.categoryLabel}
                  </p>
                  <p className="text-ivory text-[13px] leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2">
                    {a.title}
                  </p>
                  <p className="text-muted/60 text-[11px] mt-1">
                    {formatDate(a.date)}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Social */}
      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">
          Redes sociais
        </p>
        <div className="flex flex-col gap-3">
          {[
            { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
            { label: "Instagram", href: "https://instagram.com", icon: "✦" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted text-[13px] hover:text-gold transition-colors duration-200"
            >
              <span className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center text-gold text-[11px] font-bold">
                {s.icon}
              </span>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
