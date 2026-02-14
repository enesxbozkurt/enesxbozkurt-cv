import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                panel: '#0B0F0B',
                item: '#121612', // Slightly lighter panel for items
                text: '#EDEDED',
                muted: '#A3A3A3',
                primary: {
                    DEFAULT: '#29FF4F',
                    dark: '#00C853',
                    dim: 'rgba(41, 255, 79, 0.1)',
                },
                border: 'rgba(41, 255, 79, 0.15)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(41, 255, 79, 0.15), transparent 50%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(41, 255, 79, 0.3)',
                'glow-sm': '0 0 10px rgba(41, 255, 79, 0.2)',
                'glow-lg': '0 0 40px rgba(41, 255, 79, 0.4)',
                'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
