import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TODO: replace with real 1-Group brand tokens when available.
        brand: {
          50: '#f5f4f0',
          100: '#e8e5db',
          500: '#7a7359',
          700: '#443f30',
          900: '#15130e',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
