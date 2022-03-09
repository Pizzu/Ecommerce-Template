module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		/* Add colors property to replace default palette */
    container: {
      center: true,
      padding: '7.29rem'
    },
    screens: {
      xl: '1920px',
      lg: { 'max': '991px' },
      md: { 'max': '767px' },
      sm: { 'max': '479px' }
    },
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans"]
      },
      fontSize: {
        'html-xl': '19.2px',
        'html-base': '1vw',
        'html-lg': '1.7vw',
        'html-md': '2.2vw',
        'html-sm': '3.1vw',
      }
    },
  },
  plugins: [],
}
