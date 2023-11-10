import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: {
          DEFAULT: "#FFFBFF",
        },
        primary: {
          DEFAULT: "#740074",
          outline: "#E2ACE2",
          card: "#F3E4F3",

          //https://hihayk.github.io/scale/#4/4/50/87/5/-5/20/5/740074/116/0/116/white
          50: "#EEDEED",
          100: "#D2A6CF",
          200: "#B46FB1",
          300: "#953893",
          500: "#640066",
          600: "#540058",
          700: "#45004A",
          800: "#36003B",
        },
      },
      fontFamily: {
        primary: ["var(--font-sansation)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
