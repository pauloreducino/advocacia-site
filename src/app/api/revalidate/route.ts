import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  try {
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');

    return NextResponse.json({
      revalidated: true,
      paths: ['/', '/blog', '/blog/[slug]'],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Erro na revalidação' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
