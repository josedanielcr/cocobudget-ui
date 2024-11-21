/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors : {
        primary: {
          100: '#71b6c3',
          200: '#5ca9b7',
          300: '#479baa',
          400: '#328e9e'
        },
        secondary: {
          100: '#6e9a43',
          200: '#5e8539',
          300: '#4e7130',
          400: '#3f5d27'
        },
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
