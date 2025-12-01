/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        charcoal: "#111117",
        amberLux: "#fbbf77",
        softGold: "#facc6b",
        fog: "#1c1d24"
      },
      boxShadow: {
        "lux-soft": "0 18px 45px rgba(0,0,0,0.55)"
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
