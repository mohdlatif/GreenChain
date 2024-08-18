/** @type {import('tailwindcss').Config} */

import { extract } from 'fluid-tailwind'
import fluid from 'fluid-tailwind'
import plugin from 'tailwindcss/plugin'
import twReset from 'tw-reset'
import flowbite from 'flowbite-react/tailwind'

/* eslint-disable sort-keys-plus/sort-keys */
export default {
  content: {
    extract,
    files: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
      flowbite.content(),
    ],
  },
  corePlugins: {},
  darkMode: 'class',
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '[type="search"]::-webkit-search-cancel-button': {
          display: 'none',
        },
        '[type="search"]::-webkit-search-decoration': {
          display: 'none',
        },
        '[type="search"]::-webkit-search-results-button': {
          display: 'none',
        },
        '[type="search"]::-webkit-search-results-decoration': {
          display: 'none',
        },
      })
    }),
    fluid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    flowbite.plugin(),
  ],
  presets: [twReset],
  theme: {
    extend: {
      colors: {},
      maxWidth: {
        '8xl': '90rem',
      },
    },
    fontFamily: {
      roboto: ['Roboto Mono Variable', 'monospace'],
      inter: ['Inter Variable', 'sans-serif'],
    },

    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.5715' }],
      base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
      lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
      xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
      '2xl': ['1.5rem', { lineHeight: '1.415', letterSpacing: '-0.017em' }],
      '3xl': ['1.875rem', { lineHeight: '1.333', letterSpacing: '-0.017em' }],
      '4xl': ['2.25rem', { lineHeight: '1.277', letterSpacing: '-0.017em' }],
      '5xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.017em' }],
      '6xl': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
      '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.017em' }],
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
      widest: '0.4em',
    },
    animation: {
      endless: 'endless 20s linear infinite',
      shine: 'shine 5s linear 500ms infinite',
      float: 'float 2s ease-in-out infinite',
    },
    keyframes: {
      endless: {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(-245px)' },
      },
      shine: {
        '0%': {
          top: '0',
          transform: 'translateY(-100%) scaleY(10)',
          opacity: '0',
        },
        '2%': { opacity: '.5' },
        '40%': {
          top: '100%',
          transform: 'translateY(0) scaleY(200)',
          opacity: '0',
        },
        '100%': {
          top: '100%',
          transform: 'translateY(0) scaleY(1)',
          opacity: '0',
        },
      },
      float: {
        '0%': { transform: 'translateY(3%)' },
        '50%': { transform: 'translateY(-3%)' },
        '100%': { transform: 'translateY(3%)' },
      },
    },
    screens: {
      '3xs': '22.5rem', // 360px
      '2xs': '30rem', // 480px
      xs: '37.5rem', // 600px
      sm: '48rem', // 768px
      md: '64rem', // 1024px
      lg: '80rem', // 1280px
      xl: '90rem', // 1440px
      '2xl': '100rem', // 1600px
      '3xl': '120rem', // 1920px
      '4xl': '160rem', // 2560px
    },
  },
}
