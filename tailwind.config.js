module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "dark-800": "#252241",
        "dark-900": "#0D0A2C",
        "dark-700": "#3D3A56",
        "dark-600": "#55526B",
        "dark-400": "#858295",
        "dark-500": "#6D6A80",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}