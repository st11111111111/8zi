import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': '#AA2B1D',
        'chinese-gold': '#F7C242',
        'chinese-black': '#1C1C1C',
        'chinese-jade': '#7BCB9F',
        'paper': '#F5E6CA',
        'mystic-purple': '#4A154B',
        'mystic-blue': '#2B1055',
        'golden-light': '#FFD700',
      },
      fontFamily: {
        'chinese': ['STKaiti', 'KaiTi', 'serif'],
        'english': ['Roboto', 'Arial', 'sans-serif'],
        'vietnamese': ['Roboto', 'Arial', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '10px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'floating': 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.golden-light), 0 0 20px theme(colors.golden-light)',
      }
    },
  },
  plugins: [],
};

export default config;