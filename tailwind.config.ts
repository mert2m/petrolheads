import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ph-red': '#E31E24',
        'ph-black': '#1A1A1A',
        'ph-dark': '#2D2D2D',
      },
      fontFamily: {
        'race': ['Race Sport', 'Oswald', 'Arial Black', 'Impact', 'sans-serif'],
        'futura': ['Futura PT', 'Jost', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(227, 30, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(227, 30, 36, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

