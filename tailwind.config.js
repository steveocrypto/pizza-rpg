const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      scale: {
        300: "3",
      },
      fontSize: {
        xxxs: "0.3rem",
        xxs: "0.4rem",
      },
      animation: {
        fadeIn: "fadeIn 0.6s forwards",
        fadeOut: "fadeOut 0.6s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
