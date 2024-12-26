/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        white: '#ffffff',
        'light-gray-1': '#fbfbfb',
        'light-gray-2': '#f9f9f9',
        'light-gray-3': '#f4f5f6',
        gray: '#ececec',
        red: '#f84525',
        'gray-alpha-1': '#3535351a',
        'gray-alpha-2': '#35353580',
        'dark-gray-1': '#262626',
        'dark-gray-2': '#1c1c1c',
        'dark-gray-3': '#101010',
        'black-alpha': '#000000e6',
        black: '#000000',
      },
      textColor: {
        white: '#ffffff',
        'gray-alpha': '#a2a1a2',
        red: '#f84525',
        gray: '#848484',
        'bright-red': '#ff0000',
        blue: '#0000ee',
        'dark-gray': '#101010',
        blackish: '#040201',
        black: '#000000',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        48: '192px',
        56: '224px',
        64: '256px',

        '1/2': '50%',
        '1/3': '33.333%',
        '2/3': '66.666%',
        '1/4': '25%',
        '3/4': '75%',
        full: '100%',

        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
        display: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'Lato', 'sans-serif'],
      },
      screens: {
        xs: { max: '479px' },
        sm: { max: '639px' },
        md: { max: '767px' },
        lg: { max: '1023px' },
        xl: { max: '1279px' },
        '2xl': { max: '1535px' },
      },
    },
  },
  plugins: [],
};
