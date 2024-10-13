import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#001F3F",
          textBlack: "#111827",
          textInput: "#333333",
          whiteBg: "#F6F6F6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
