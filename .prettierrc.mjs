/** @type {import('prettier').Config} */
export default {
  bracketSpacing: true,
  endOfLine: 'lf',
  // jsxBracketSameLine: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
}
