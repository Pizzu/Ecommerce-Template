module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		/* Add colors property to replace default palette */
    container: {
      center: true,
      padding: "5rem"
    },
    screens: {
      xl: "1650px",
      lg: { "max": "991px" },
      md: { "max": "767px" },
      sm: { "max": "479px" }
    },
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans"]
      },
      fontSize: {
        'html-xl': "18.333333333333336px",
        'html-base': "1.1111111111111112vw",
        'html-lg': "11.011111111111111px",
        'html-md': "8.622222222222222px",
        'html-sm': "5.322222222222223px",
        "caption": "1.13rem",
        "nav-link": "1.25rem"
      },
      colors: {
        "primary": "#FF6B4A",
        "secondary": "#2ABEDF",
        "grey-light": "#F7F7F7",
        "grey-dark": "#999999"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
