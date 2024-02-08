/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'inputIcon': "url('/images/At sign.svg')",
      },
      fontFamily: {
        // DM : ["DM Sans", "sans-serif"],
        Mont : ["Montserrat", "sans-serif"],
        // Inter : ["Inter", "sans-serif"],
        // NeueMontreal: ["Neue Montreal"],
        Poppins: ["Poppins", "sans-serif"],
      },
      content: {},
      boxShadow: {
        "navbar": "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
      },
    },
    screens: {
      lsm: "350px",

      esm: "400px",

      em: "480px",

      ew: "510px",

      vem: "560px",

      sm: "640px",

      md: "768px",

      emd: "999px",

      lg: "1024px",

      xlg: "1150px",

      xl: "1280px",

      "1xl": "1440px",

      "2xl": "1536px",


      "3xl": "1600px",
    },
  },
  plugins: [],
};
