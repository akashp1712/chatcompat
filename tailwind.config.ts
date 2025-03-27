/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}', // Scan the app directory
      './components/**/*.{js,ts,jsx,tsx}', // Scan the components directory
    ],
    theme: {
      extend: {
        // You can extend the default theme here if needed
        colors: {
          // Optional: Add custom colors if needed
        },
      },
    },
    plugins: [],
  };