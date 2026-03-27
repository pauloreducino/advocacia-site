import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0F1A',
        surface: '#111827',
        deep: '#0A0E18',
        gold: '#C9A84C',
        'gold-light': '#E5C97A',
        'gold-dim': 'rgba(201,168,76,0.12)',
        ivory: '#F5F0E8',
        muted: '#9A9A8A',
        slate: '#1E2D40',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        number: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatY2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scalesSway: {
          '0%, 100%': { transform: 'translateY(-50%) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-50%) rotate(1.5deg)' },
        },
        wipeIn: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0% 0 0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.09' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-y': 'floatY 4s ease-in-out infinite',
        'float-y-2': 'floatY2 5s ease-in-out 0.8s infinite',
        'scales-sway': 'scalesSway 8s ease-in-out infinite',
        'wipe-in': 'wipeIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both',
        'fade-up': 'fadeUp 0.7s ease both',
        'fade-up-delayed': 'fadeUp 0.7s ease 0.35s both',
        'fade-up-more': 'fadeUp 0.7s ease 0.5s both',
        'fade-in': 'fadeIn 1s ease 0.2s both',
        'bounce-soft': 'bounceSoft 1.8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'count-up': 'countUp 0.6s ease forwards',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
