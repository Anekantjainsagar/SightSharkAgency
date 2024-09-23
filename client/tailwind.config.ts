import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#091022",
        gradientMain: "#030636",
        btnBlue: "#2A66FF",
        newPurple: "#605EFD",
        newGrey: "#CACACA",
        mainBlue: "#006FFF",
        newBlue: "#0155FB",
        newBubbleColor: "#1664FF",
        textGrey: "#CECFD2",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
