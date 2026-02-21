/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-charcoal': '#0a0c0f',
        'neon-mango': '#ffb347',
        'liquid-glow': '#ff8c42',
        'electric-orange': '#ff6b2b',
        'dark-surface': '#14181c',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'meter-fill': 'meterFill 1.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 180, 70, 0.3)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 140, 66, 0.6)',
            filter: 'brightness(1.2)'
          },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-10px) translateY(10px)' },
          '75%': { transform: 'translateX(10px) translateY(-10px)' },
        },
        meterFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'liquid-gradient': 'radial-gradient(circle at 30% 50%, rgba(255,180,70,0.15) 0%, transparent 50%)',
        'neom-glow': 'radial-gradient(circle at center, rgba(255,140,66,0.2) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}