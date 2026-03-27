import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface Props {
  articles: Article[];
}

export default function FeaturedCarousel({ articles }: Props) {
  const [main, secondary] = articles;
  if (!main) return null;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-14"
      aria-label="Artigos em destaque"
    >
      {/* Main featured */}
      <Link
        href={`/blog/${main.slug}`}
        className="lg:col-span-3 group relative block overflow-hidden rounded"
        aria-label={`Artigo em destaque: ${main.title}`}
      >
        <div className="relative h-72 lg:h-96 bg-slate">
          <Image
            src={main.imageUrl}
            alt={main.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[10px] text-gold tracking-[2px] uppercase mb-2">
              {main.categoryLabel}
            </p>
            <h2 className="font-display text-ivory text-xl lg:text-2xl leading-snug mb-2 group-hover:text-gold-light transition-colors duration-200">
              {main.title}
            </h2>
            <div className="flex items-center gap-3 text-ivory/60 text-[11px]">
              <span>{formatDate(main.date)}</span>
              <span>·</span>
              <span>{main.readTime} min de leitura</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Secondary featured */}
      {secondary && (
        <Link
          href={`/blog/${secondary.slug}`}
          className="lg:col-span-2 group relative block overflow-hidden rounded"
          aria-label={`Artigo em destaque: ${secondary.title}`}
        >
          <div className="relative h-72 lg:h-96 bg-slate">
            <Image
              src={secondary.imageUrl}
              alt={secondary.imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] text-gold tracking-[2px] uppercase mb-2">
                {secondary.categoryLabel}
              </p>
              <h2 className="font-display text-ivory text-lg leading-snug mb-2 group-hover:text-gold-light transition-colors duration-200">
                {secondary.title}
              </h2>
              <div className="flex items-center gap-3 text-ivory/60 text-[11px]">
                <span>{formatDate(secondary.date)}</span>
                <span>·</span>
                <span>{secondary.readTime} min de leitura</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
