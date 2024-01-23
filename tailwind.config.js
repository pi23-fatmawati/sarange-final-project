/** @type {import('tailwindcss').Config} */

import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        "green-1": "#D3F8B7",
        "green-2": "#52C41A",
        "green-3": "#8DC149",
        "green-4": "#5B7D2E",
        "grey-1": "#F7F6FE",
        "grey-2": "#8C8C8C"
      }
    },
  },
  plugins: [
    flowbitePlugin
  ],
}