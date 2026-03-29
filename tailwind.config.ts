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
        bg: {
          light: '#E8E8E3',
          dark: '#0a0a0a',
        },
        text: {
          primary: '#171717',
          light: '#E8E8E3',
          muted: '#8C8C73',
          gray: '#888888',
        },
        border: {
          subtle: '#1a1a1a',
        },
        card: {
          1: '#0a0a0a',
          2: '#0f0f0f',
          3: '#111111',
          4: '#131313',
          5: '#161616',
        },
      },
      fontFamily: {
        mono: ['var(--font-space-grotesk)', 'monospace'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
