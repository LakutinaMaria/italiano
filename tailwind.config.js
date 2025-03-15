/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      dicplay: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#05B6D3",
        secondary: "#EF863E",
      },
      backgroundImage: {
        "login-bg-img": "url('./src/assets/images/bg-image.png')",
        "singup-bg-img": "url('./src/assets/images/bg-image.png')",
      },
    },
  },
  plugins: [],
};
