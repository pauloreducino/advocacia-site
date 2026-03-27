import type { Article, WPPost, Category } from '@/types';
import { fallbackArticles } from '@/data/articles';

const WP_API = process.env.WORDPRESS_API_URL ?? 'http://localhost/wp-json/wp/v2';

export function wpPostToArticle(post: WPPost): Article {
  const acf = post.acf ?? {};
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const tagsRaw = acf.tags ?? '';
  const tags = tagsRaw ? tagsRaw.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered
      .replace(/&#8211;/g, '\u2013')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"'),
    excerpt: acf.excerpt ?? '',
    content: post.content.rendered,
    date: post.date,
    readTime: Number(acf.read_time ?? 5),
    categoryLabel: acf.category_label ?? 'Jurídico',
    categorySlug: acf.category_slug ?? 'juridico',
    tags,
    featured: acf.featured ?? false,
    imageUrl:
      media?.source_url ??
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    imageAlt: media?.alt_text ?? post.title.rendered,
    authorName: 'Dr. Henrique Cavalcante',
  };
}

async function fetchWP<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_API}${path}`, {
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const posts = await fetchWP<WPPost[]>('/posts?_embed&per_page=100&status=publish');
  if (!posts || posts.length === 0) return fallbackArticles;
  return posts.map(wpPostToArticle);
}

export async function getLatestArticles(n: number = 3): Promise<Article[]> {
  const posts = await fetchWP<WPPost[]>(
    `/posts?_embed&per_page=${n}&status=publish&orderby=date&order=desc`
  );
  if (!posts || posts.length === 0) return fallbackArticles.slice(0, n);
  return posts.map(wpPostToArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const all = await getAllArticles();
  const featured = all.filter((a) => a.featured);
  if (featured.length >= 2) return featured.slice(0, 2);
  return all.slice(0, 2);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const posts = await fetchWP<WPPost[]>(`/posts?_embed&slug=${slug}&status=publish`);
  if (!posts || posts.length === 0) {
    return fallbackArticles.find((a) => a.slug === slug) ?? null;
  }
  return wpPostToArticle(posts[0]);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await fetchWP<WPPost[]>('/posts?per_page=100&status=publish&_fields=slug');
  if (!posts || posts.length === 0) return fallbackArticles.map((a) => a.slug);
  return posts.map((p) => p.slug);
}

export async function buildDynamicCategories(): Promise<Category[]> {
  const all = await getAllArticles();
  const map = new Map<string, Category>();
  for (const a of all) {
    if (!map.has(a.categorySlug)) {
      map.set(a.categorySlug, { label: a.categoryLabel, slug: a.categorySlug, count: 0 });
    }
    map.get(a.categorySlug)!.count!++;
  }
  return Array.from(map.values());
}
