/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: {
      gray1: "#EFEFEF",
      whiteGray: "#D8D8D8",
    },
    borderColor:{
      borderGray:"#D8D8D8"
    },
    screens: {
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
    },
  },
  plugins: [],
};
