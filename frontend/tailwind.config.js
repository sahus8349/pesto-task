/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        check: "url('/src/images/check.svg')",
        down: "url('/src/images/downArrow.svg')",
      },
    },
    fontSize: {
      100: ["0.625rem", "0.75rem"], //['10px', '12px']
      200: ["0.75rem", "1rem"], //['12px', '16px']
      300: ["0.8125rem", "1.125rem"], //['13px', '18px']
      400: ["0.875rem", "1.25rem"], //['14px', '20px']
      450: ["0.938rem", "1.25rem"], //['15px', '20px']
      500: ["1rem", "1.5rem"], //['16px', '24px']
      600: ["1.125rem", "1.5rem"], //['18px', '24px']
      700: ["1.25rem", "1.5rem"], //['20px', '24px']
      800: ["1.5rem", "2rem"], //['24px', '32px']
      900: ["2rem", "2.5rem"], //['32px', '40px']
    },
    colors: {
      none: "transparent",
      "primary-100": "#F15845",
      "primary-200": "#D74B3A",
      "secondary-100": "#4A154B",
      "secondary-200": "#320B33",
      "secondary-300": "#BB6BD9",
      "gray-100": "#D9D9D9",
      "gray-200": "#F8F8F8",
      "gray-300": "#232323",
      "gray-400": "#EFEFEF",
      "gray-500": "#646464",
      "gray-600": "#f5f8fb",
      "gray-700": "#888888",
      "gray-800": "#D7D7D7",
      "gray-900": "#00000020",
      "green-100": "#2EB67D",
      "green-200": "#70BF0B",
      "blue-100": "#0080ff",
      "blue-200": "#9269F7",
      "blue-300": "#414bb2",
      "blue-400": "#EFF7FF",
      "pastel-100": "#E9F3E4",
      "pastel-200": "#F0E9FF",
      "pastel-300": "#E9EFF5",
      "pastel-400": "#E6E6E6",
      "pastel-500": "#efefef80",
      "orange-300": "#F3B24C",
      "shadow-100": "rgba(0, 0, 0, 0.12)",
      white: "#fff",
      black: "#000",
      error: "#E01E1E",
    },
    boxShadow: {
      0: "none",
      100: "0px 8px 16px 0px rgba(0, 0, 0, 0.12)",
      200: "0px 10px 20px 0px rgba(0, 0, 0, 0.08)",
      300: "0 12px 24px -10px #0000000f",
      400: "0px 3.133px 23.494px 0px rgba(0, 0, 0, 0.05)",
      500: "0px 4px 30px 0px rgba(0, 0, 0, 0.04)",
      600: "0 8px 16px #F158451f",
      700: "0 8px 16px #0000001f"
    },
    screens: {
      'xs': {'max': '950px'},
      // => @media (max-width: 950px) { ... }

      'sm': {'max': '1060px'},
      // => @media (max-width: 950px) { ... }

      'md': {'min': '1061px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
