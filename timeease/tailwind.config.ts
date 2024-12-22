import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D5AE6',
          dark: '#5644C4',
          light: '#8571FF'
        },
        secondary: {
          DEFAULT: '#A69EFF',
          dark: '#8A7FE6',
          light: '#C2BDFF'
        },
        background: {
          light: '#FFFFFF',
          dark: '#1A1625'
        },
        card: {
          light: '#F8F9FA',
          dark: '#2D2B35'
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #1A1625 0%, #2D2B35 100%)',
        'gradient-light': 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)'
      }
    },
  },
  plugins: [],
}
export default config