/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0D0D0D',
          blue: '#00FFFF',
          purple: '#9900FF',
          pink: '#FF00FF',
          green: '#00FF00',
          gray: '#1A1A1A',
          'gray-light': '#2A2A2A',
        }
      },
      fontFamily: {
        'cyber': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'cursor-trail': 'cursor-trail 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #9900FF 0%, #00FFFF 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ffffff',
            maxWidth: 'none',
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};