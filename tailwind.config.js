/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors : {
        info: 'rgb(37, 99, 235)',
        success: 'rgb(22, 163, 74)',
        error: 'rgb(239, 68, 68)',
        warning: 'rgb(234, 179, 8)'
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}
