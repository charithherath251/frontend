/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slide-in 0.5s ease forwards',
      },
      keyframes: {
        'slide-in': {
          from: {
            opacity: 0,
            transform: 'translateY(50%)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      colors: {
        customYellow: '#f79f2a',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#570df8",
          "secondary": "#c79500",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
          "cancel": "#730000",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

