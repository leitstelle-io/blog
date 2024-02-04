/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/.vue',
    './pages/**/.vue',
    './content/**/*.md',
  ],
  safelist: ['rounded-lg', 'rounded-full', 'after:p-2', 'after:p-4'],
  theme: {
    extend: {
      backgroundColor: {
        'primary': 'rgb(181,0,54)'
      },
      fontSize: {
        '2xs': '.6875rem',
      },
      opacity: {
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      animation: {
        typing: 'blink .7s infinite',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0",
            visibility: "hidden"
          },
          "100%": {
            width: "22.5ch"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

