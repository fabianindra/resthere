/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#008DDA',
      secondary: '#41C9E2',
      tertiary: '#ACE2E1',
      travertine: '#F7EEDD',
    },
    extend: {},
  },
  plugins: [],
};
