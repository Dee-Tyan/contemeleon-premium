/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': 'var(--font-orbitron)',
        'space-mono': 'var(--font-space-mono)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gray-10': '#F4F6FE',
        'gray-30': '#C9D1E4',
        'gray-70': 'rgba(201, 209, 228, 0.12)',
        'blue-10': '#44BCFF',
        'blue-20': '#34A1FF',
        'blue-90': '#060A15',
        'pink-30': '#FF44EC',
        'pink-90': '#DA44FF',
        'purple-10': '#8B44FF',
        'pink-10': '#E14597',
        'purple-10': '#752583'
      }
    },
  },
  plugins: [],
}
