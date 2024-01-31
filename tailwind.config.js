/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#fafafa',
        200: '#dddddd',
        300: '#cccccc',
        900: '#1a202c',
        'metlife':'#eee',
      },
      'metlife-blue':'#007abc'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      minWidth: {
        '256': '64rem',
        'inner': '80rem',
      },
      maxWidth: {
        'inner': '80rem',
        'inner-s': '72rem',
      },
      height: {
        '256': '64rem',
      },
      gradientColorStops: (theme) => ({
        'primary': theme('colors.blue.500'),
        'secondary': theme('colors.green.500'),
      }),
    }
  },
  plugins: [],
}

