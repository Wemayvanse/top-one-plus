module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
             800: '#351e2f', 
          700: '#2a1728', 
          600: '#3e2445' 
        },
        light: {
          50: '#f9fafb', // matches your --card in light mode
          100: '#ffffff', // matches your --background in light mode
        },
      },
    },
  },
  plugins: [],
}