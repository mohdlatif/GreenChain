module.exports = {
  plugins: [
    // Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    require('tailwindcss'),
    // But others, like autoprefixer, need to run after,
    require('autoprefixer'),
    // require('@fullhuman/postcss-purgecss')({
    //   content: ['../src/*/*.astro'],
    // }),
    // require('postcss-variable-compress'),
  ],
}
