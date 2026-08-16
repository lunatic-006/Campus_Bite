/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(255, 255, 255, 0.9)',
          shadow: 'rgba(31, 38, 135, 0.07)',
          accent: '#4f46e5',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b'
        }
      },
      backdropBlur: {
        'liquid': '24px',
        'subtle': '12px'
      },
      boxShadow: {
        'glass-glow': '0 8px 32px 0 rgba(31, 38, 135, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
        'glass-card': '0 20px 40px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'liquid-button': '0 10px 25px -5px rgba(79, 70, 229, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'token-glow': '0 15px 35px -5px rgba(16, 185, 129, 0.3)'
      },
      keyframes: {
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
