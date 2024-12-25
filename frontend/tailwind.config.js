/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", 
        "./src/**/*.{js,ts,jsx,tsx}",
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'space': ['"Space Mono"', 'monospace'],
          'gaming': ['"Press Start 2P"', 'cursive'],
        },
        colors: {
          'game-dark': 'var(--game-dark)',
          'game-darker': 'var(--game-darker)',
          'game-purple': 'var(--game-purple)',
          'game-pink': 'var(--game-pink)',
          'game-card': 'var(--game-card)',
        },
        backgroundSize: {
          'size-200': '200% 200%',
        },
        animation: {
          'gradient': 'gradient 8s linear infinite',
        },
        keyframes: {
          gradient: {
            '0%, 100%': {
              'background-position': '0% 50%',
            },
            '50%': {
              'background-position': '100% 50%',
            },
          },
        },
      },
    },
    plugins: [],
}