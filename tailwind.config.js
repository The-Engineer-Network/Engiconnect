/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          deep: '#3B2CC0',
          indigo: '#6C47FF',
        },
        accent: {
          cyan: '#22D3EE',
          mint: '#34D399',
        },
        neutral: {
          white: '#F9FAFB',
          dark: '#1F2937',
          medium: '#9CA3AF',
        },
        status: {
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444',
        },
      },
    },
  },
  plugins: [],
};