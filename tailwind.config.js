/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#7c3aed', // purple-600
          secondary: '#06b6d4', // cyan-500
          accent: '#f472b6', // pink-400
          background: '#f3f4f6', // gray-100
          foreground: '#1e293b', // slate-800
          muted: '#e0e7ef', // purple-100
          destructive: '#f87171', // red-400
          border: 'var(--color-border)',
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        fontSize: {
          'xs': ['0.85rem', { lineHeight: '1.5' }],
          'sm': ['1rem', { lineHeight: '1.6' }],
          'base': ['1.15rem', { lineHeight: '1.7' }],
          'lg': ['1.35rem', { lineHeight: '1.7' }],
          'xl': ['1.7rem', { lineHeight: '1.2' }],
          '2xl': ['2.1rem', { lineHeight: '1.15' }],
          '3xl': ['2.6rem', { lineHeight: '1.1' }],
          '4xl': ['3.2rem', { lineHeight: '1.05' }],
        },
      },
    },
    plugins: [],
};