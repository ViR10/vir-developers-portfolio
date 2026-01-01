/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
    colors: {
    gold: "#E2B87F",
    platinum: "#E0E5EC",
    sapphire: "#344675",
    jet: "#19181F",
    accent: "#7367F0"
  },
  fontFamily: {
    heading: ["'Unbounded'", "'Montserrat'", "sans-serif"],
    body: ["'Poppins'", "sans-serif"]
  },
      boxShadow: {
        soft: "0 2px 14px rgba(72, 180, 188, 0.10)",
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [],
};
