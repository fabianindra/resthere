module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
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
  plugins: [require('@tailwindcss/forms')],
};
