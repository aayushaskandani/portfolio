/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ff3b3b',
          redHover: '#ff4d5a',
          teal: '#008080',
          darkBg: '#08090d',
          surface: '#11131c',
          card: '#161925',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        pixel: ['VT323', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

