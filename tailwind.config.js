/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation:{
        'spin-slow': 'spin 1.2s linear infinite',
      },
      colors:{
        'blackslow': 'rgba(0,0,0,0.80)'
      }
    },
  },
  plugins: [],
}

