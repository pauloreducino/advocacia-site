import { redirect } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default function ArticleRedirect({ params }: Props) {
  redirect(`/pt-br/blog/${params.slug}`);
}
