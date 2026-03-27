"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Article, Category } from "@/types";
import { formatDate } from "@/lib/utils";

const PER_PAGE = 6;

interface Props {
  articles: Article[];
  categories: Category[];
  initialCategory?: string;
}

export default function ArticlesGrid({
  articles,
  categories,
  initialCategory,
}: Props) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "todos");
  const [page, setPage] = useState(1);

  // Monitorar mudanças no parâmetro 'categoria' da URL
  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");
    if (categoriaParam) {
      setCategory(categoriaParam);
      setPage(1);
    }
  }, [searchParams]);

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
          placeholder="Buscar artigos..."
          aria-label="Buscar artigos"
          className="w-full bg-surface border border-gold/15 text-ivory text-[14px] px-5 py-3 rounded-sm placeholder-muted/40 focus:outline-none focus:border-gold/40 transition-colors"
        />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por categoria"
        >
          <button
            onClick={() => handleFilter("todos")}
            className={`text-[11px] tracking-[1.5px] uppercase px-4 py-2 rounded-sm transition-colors duration-200 ${
              category === "todos"
                ? "bg-gold text-primary font-medium"
                : "border border-gold/25 text-muted hover:border-gold/50 hover:text-gold"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleFilter(cat.slug)}
              className={`text-[11px] tracking-[1.5px] uppercase px-4 py-2 rounded-sm transition-colors duration-200 ${
                category === cat.slug
                  ? "bg-gold text-primary font-medium"
                  : "border border-gold/25 text-muted hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <p className="text-muted text-center py-16">
          Nenhum artigo encontrado.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          role="list"
          aria-label="Lista de artigos"
        >
          {paged.map((a) => (
            <article
              key={a.slug}
              role="listitem"
              className="group flex flex-col"
            >
              <Link href={`/blog/${a.slug}`} className="block">
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
                <div className="flex items-center gap-3 text-muted/60 text-[11px]">
                  <span>{formatDate(a.date)}</span>
                  <span>·</span>
                  <span>{a.readTime} min de leitura</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Paginação" className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={`Página ${p}`}
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
