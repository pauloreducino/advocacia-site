'use client';
import { useEffect } from 'react';

export default function AnchorScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    links.forEach((l) => l.addEventListener('click', handleClick));
    return () => links.forEach((l) => l.removeEventListener('click', handleClick));
  }, []);

  return null;
}
