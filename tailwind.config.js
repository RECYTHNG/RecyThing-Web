/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6edf0',   // AAA
          100: '#b0c6d2',  // AAA
          200: '#8aaabc',  // AAA
          300: '#54849d',  // AA
          400: '#336c8a',  // AA
          500: '#00476d',  // AAA
          600: '#004163',  // AAA
          700: '#00324d',  // AAA
          800: '#00273c',  // AAA
          900: '#001e2e',  // AAA
        },
        secondary: {
          50: '#f2f7eb',   // AAA
          100: '#d7e7c2',  // AAA
          200: '#c4dca5',  // AAA
          300: '#a9cb7c',  // AAA
          400: '#99c162',  // AAA
          500: '#7fb23b',  // AAA
          600: '#74a236',  // AAA
          700: '#5a7e2a',  // AA
          800: '#466220',  // AA
          900: '#354b19',  // AAA
        },
        success: {
          50: '#e7f4ec',   // AAA
          100: '#b5dcc5',  // AAA
          200: '#92cba9',  // AAA
          300: '#60b382',  // AAA
          400: '#41a56a',  // AA
          500: '#118e45',  // AA
          600: '#0f813f',  // AA
          700: '#0c6531',  // AAA
          800: '#094e26',  // AAA
          900: '#073c1d',  // AAA
        },
        info: {
          50: '#e6f4fc',   // AAA
          100: '#b1ddf6',  // AAA
          200: '#8bccf2',  // AAA
          300: '#55b5ec',  // AAA
          400: '#35a6e8',  // AA
          500: '#0290e2',  // AA
          600: '#0283ce',  // AA
          700: '#0166a0',  // AA
          800: '#014f7c',  // AAA
          900: '#013c5f',  // AAA
        },
        warning: {
          50: '#fef6e6',   // AAA
          100: '#fde3b0',  // AAA
          200: '#fcd68a',  // AAA
          300: '#fbc354',  // AAA
          400: '#fab833',  // AAA
          500: '#f9a600',  // AAA
          600: '#e39700',  // AA
          700: '#b17600',  // AA
          800: '#895b00',  // AA
          900: '#694600',  // AAA
        },
        danger: {
          50: '#fbeaec',   // AAA
          100: '#f2bcc5',  // AAA
          200: '#ec9ca9',  // AAA
          300: '#e46f82',  // AA
          400: '#de536a',  // AA
          500: '#d62845',  // AA
          600: '#c3243f',  // AA
          700: '#981c31',  // AAA
          800: '#761626',  // AAA
          900: '#5a111d',  // AAA
        },
        light: {
          50: '#fdfdfd',   // AAA
          100: '#f7f7f7',  // AAA
          200: '#f4f4f4',  // AAA
          300: '#eeeeee',  // AAA
          400: '#ebebeb',  // AAA
        },
        dark: {
          500: '#e6e6e6',  // AAA
          600: '#d1d1d1',  // AAA
          700: '#a3a3a3',  // AA
          800: '#7f7f7f',  // AA
          900: '#616161',  // AA
        }
      },
      container: {
        center: true,
        screens: {
          sm: '40rem',
          md: '48rem',
          lg: '64rem',
          xl: '80rem',
          xxl: '90rem',
        },
      },
      boxShadow: {
        'filter': '0px 0px 4px 0px rgba(0, 0, 0, 0.25)', // custom shadow
      },
      fontFamily: {
        'poppins': ['Poppins', 'Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
}