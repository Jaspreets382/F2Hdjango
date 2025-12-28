export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(200px)' },
        },
      },
      animation: {
        slideRight: 'slideRight 2s linear infinite',
      },
    },
  },
}
