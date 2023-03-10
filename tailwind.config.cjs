/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      colors: {
        "blue-deep": "#0424FA",
        "blue-medium-deep": "#0D53DE",
        "blue-bright": "#1B8FF5",
        "blue-medium-bright": "#0DA6DE",
        "cyan-bright": "#0FEFFF",
      },
    },
  },
  plugins: [],
};
