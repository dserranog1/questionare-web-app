/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        pacifico: "Pacifico",
      },
      colors: {
        "blue-deep": "#0424FA",
        "blue-medium-deep": "#0D53DE",
        "blue-bright": "#1B8FF5",
        "blue-medium-bright": "#0DA6DE",
        "cyan-bright": "#0FEFFF",
        "royal-blue": "#5357C4",
        lavender: "#9494e3",
        "baby-blue": "#7fe9ff",
        "antique-white": "#fbfbff",
        lilac: "#c6c6ff",
        "baby-blue-eyes": "#7bb9ff",
      },
    },
  },
  plugins: [],
};
