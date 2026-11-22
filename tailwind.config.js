/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hse: {
          primary: '#1e3a5f',
          secondary: '#2c5f7c',
          accent: '#e86c00',
          danger: '#c0392b',
          warning: '#f39c12',
          success: '#27ae60',
          info: '#2980b9',
          light: '#ecf0f1',
          dark: '#1a252f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}