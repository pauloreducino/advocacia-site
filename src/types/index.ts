export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  categoryLabel: string;
  categorySlug: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
  imageAlt: string;
  authorName: string;
}

export interface Category {
  label: string;
  slug: string;
  count?: number;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  acf?: {
    read_time?: number;
    category_label?: string;
    category_slug?: string;
    excerpt?: string;
    tags?: string;
    featured?: boolean;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Especialidade {
  numero: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
}

export interface Depoimento {
  nome: string;
  perfil: string;
  texto: string;
  iniciais: string;
}

export interface FormacaoItem {
  ano: string;
  titulo: string;
  instituicao: string;
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}
