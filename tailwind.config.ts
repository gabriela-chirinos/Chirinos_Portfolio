import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'slate-navy': '#1E2D3A',
        'steel-blue': '#4A7B9D',
        'dusty-blush': '#F0C4B0',
        'burnt-blush': '#D4907A',
        'parchment': '#F5F0EA',
      },
      fontFamily: {
        epilogue: ['var(--font-epilogue)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.06em',
        'ultra-tight': '-0.04em',
        'display': '-0.03em',
      },
      animation: {
        'marquee': 'marquee 50s linear infinite',
        'spin-sacred': 'spin-sacred 60s linear infinite',
        'spin-sacred-slow': 'spin-sacred 80s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-sacred': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.6)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-overlay': `linear-gradient(rgba(74,123,157,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,123,157,0.05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}

export default config
