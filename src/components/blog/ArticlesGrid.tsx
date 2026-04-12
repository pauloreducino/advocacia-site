"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Article, Category } from "@/types";
import { formatDate } from "@/lib/utils";

const PER_PAGE = 6;

interface Props {
  articles: Article[];
  categories: Category[];
  initialCategory?: string;
  locale?: string;
}

export default function ArticlesGrid({
  articles,
  categories,
  initialCategory,
  locale,
}: Props) {
  const t = useTranslations("blog");
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "todos");
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitorar mudanças no parâmetro 'categoria' da URL
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setCategory(categoriaParam);
      setPage(1);
    }
  }, [searchParams]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return articles.filter((a) => {
      const matchCat = category === "todos" || a.categorySlug === category;
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [articles, search, category]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (slug: string) => {
    setCategory(slug);
    setPage(1);
  };

  return (
    <div>
      {/* Search & filters */}
      <div className="mb-10 flex flex-col gap-5">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchAriaLabel")}
          className="w-full bg-surface border border-gold/15 text-ivory text-[14px] px-5 py-3 rounded-sm placeholder-muted/40 focus:outline-none focus:border-gold/40 transition-colors"
        />
        {/* Category dropdown */}
        <div ref={dropdownRef} className="relative w-full sm:w-72" role="group" aria-label={t("filterAriaLabel")}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="w-full flex items-center justify-between gap-3 bg-surface border border-gold/20 hover:border-gold/50 text-[11px] tracking-[2px] uppercase px-5 py-3 rounded-sm transition-colors duration-200 group"
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span className={category === "todos" ? "text-gold" : "text-ivory"}>
                {category === "todos"
                  ? t("all")
                  : categories.find((c) => c.slug === category)?.label ?? t("all")}
              </span>
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className={`text-gold/60 transition-transform duration-300 flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown list */}
          <div
            role="listbox"
            aria-label={t("filterAriaLabel")}
            className={`absolute left-0 right-0 top-full mt-1 z-20 bg-deep border border-gold/20 rounded-sm overflow-hidden shadow-xl transition-all duration-200 origin-top ${
              dropdownOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
            }`}
          >
            {[{ slug: "todos", label: t("all") }, ...categories.map((c) => ({ slug: c.slug, label: c.label }))].map((opt, i, arr) => (
              <button
                key={opt.slug}
                role="option"
                aria-selected={category === opt.slug}
                onClick={() => { handleFilter(opt.slug); setDropdownOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-[11px] tracking-[1.5px] uppercase transition-colors duration-150 text-left ${
                  i < arr.length - 1 ? "border-b border-gold/10" : ""
                } ${
                  category === opt.slug
                    ? "text-gold bg-gold/5"
                    : "text-muted hover:text-ivory hover:bg-white/5"
                }`}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors ${category === opt.slug ? "bg-gold" : "bg-transparent"}`} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <p className="text-muted text-center py-16">
          {t("noneFound")}
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          role="list"
          aria-label={t("articlesAriaLabel")}
        >
          {paged.map((a) => (
            <article
              key={a.slug}
              role="listitem"
              className="group flex flex-col"
            >
              <Link href={`/${locale ?? 'pt-br'}/blog/${a.slug}`} className="block">
                <div className="relative h-48 rounded overflow-hidden bg-slate mb-4">
                  <Image
                    src={a.imageUrl}
                    alt={a.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <p className="text-[10px] text-gold tracking-[2px] uppercase mb-2">
                  {a.categoryLabel}
                </p>
                <h3 className="font-display text-ivory text-[17px] leading-snug mb-2 group-hover:text-gold-light transition-colors duration-200 line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-muted text-[13px] leading-relaxed mb-3 line-clamp-3">
                  {a.excerpt}
                </p>
                <div className="flex items-center gap-3 text-muted text-[11px]">
                  <span>{formatDate(a.date)}</span>
                  <span>·</span>
                  <span>{a.readTime} {t("readTime")}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label={t("pagination")} className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={t("pageLabel", { page: p })}
              aria-current={p === page ? "page" : undefined}
              className={`w-9 h-9 text-[13px] rounded-sm transition-colors duration-200 ${
                p === page
                  ? "bg-gold text-primary font-medium"
                  : "border border-gold/25 text-muted hover:border-gold/50 hover:text-gold"
              }`}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
