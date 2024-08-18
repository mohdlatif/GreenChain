import eslint from '@eslint/js'
import html from '@html-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginSortKeysFix from 'eslint-plugin-sort-keys-plus'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPluginToml from 'eslint-plugin-toml'
import eslintPluginTypeScriptSortKeys from 'eslint-plugin-typescript-sort-keys'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// stolen from https://github.com/hey-api/openapi-ts/blob/810a4c2ad154712c4fc5669db5d19de75923deaf/eslint.config.js
// more examples: https://github.com/search?q=sort-keys-fix+path%3A**%2Feslint.config.js&type=code&ref=advsearch
// looks deep: https://github.com/Kamahl19/react-starter/blob/main/.eslintrc.cjs

// update: https://github.com/victor-lillo/octagon-api/blob/main/eslint.config.js

export default tseslint.config(
  eslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...tseslint.configs.strict,
  // ...tseslint.configs.stylistic,
  ...tailwind.configs['flat/recommended'],
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  jsxA11y.flatConfigs.recommended,
  ...eslintPluginToml.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',

      globals: {
        ...globals.node,
        ...globals.browser,
      },
      sourceType: 'module',
    },
  },
  {
    files: ['*.json', '*.jsonc', '*.jsonl', '*.json5'],
    rules: {
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/key-spacing': [
        'error',
        {
          afterColon: true,
          beforeColon: false,
          mode: 'strict',
        },
      ],
      'jsonc/object-curly-spacing': ['error', 'never'],
      'jsonc/sort-keys': 'error',
      // 'prettier/prettier': 'off',
    },
  },
  {
    files: ['*.toml'],
    rules: {
      'toml/indent': ['error', 2, { keyValuePairs: 1, subTables: 1 }],
      'toml/keys-order': 'warn',
      'toml/no-non-decimal-integer': 'warn',
      'toml/no-space-dots': 'warn',
      'toml/padding-line-between-pairs': 'warn',
      'toml/padding-line-between-tables': 'warn',
      'toml/quoted-keys': 'warn',
      'toml/tables-order': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,astro}'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    },
  },
  {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js', '*.astro/*.js'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // Note: you must disable the base rule as it can report incorrect errors
      'no-unused-vars': 'off',
    },
  },

  {
    // import html from "@html-eslint/eslint-plugin";
    // extends: ['plugin:@html-eslint/eslint-plugin'],
    ...html.configs['flat/recommended'],
    files: ['**/*.astro'],

    languageOptions: {
      ecmaVersion: 'latest',
      parser: astroParser,
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: tsParser,
      },

      sourceType: 'script',
    },

    // plugins: {
    //   '@html-eslint': html,
    // },
    rules: {
      // ...html.configs['flat/recommended'].rules,
      // '@html-eslint/element-newline': 'warn',
      // '@html-eslint/id-naming-convention': ['error', 'kebab-case'],
      // '@html-eslint/indent': ['error', 'space' | 2],
      '@html-eslint/no-duplicate-attrs': 'error',
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/no-extra-spacing-attrs': [
        'error',
        { enforceBeforeSelfClose: true },
      ],
      '@html-eslint/no-multiple-empty-lines': ['warn', { max: 2 }],
      // '@html-eslint/no-multiple-h1': 'error',
      // '@html-eslint/no-trailing-spaces': 'warn',
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      'astro/no-unused-css-selector': 'warn',
      'astro/prefer-object-class-list': 'warn',

      // '@html-eslint/element-newline': ['off'],
      // '@html-eslint/indent': ['off', 2],
      'perfectionist/sort-astro-attributes': [
        'error',
        {
          customGroups: {},
          groups: [],
          ignoreCase: true,
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
  // {
  //   files: ['**/*.svelte'],

  //   languageOptions: {
  //     parser: svelteParser,
  //     ecmaVersion: 'latest',
  //     sourceType: 'script',

  //     parserOptions: {
  //       parser: tsParser,
  //       extraFileExtensions: ['.svelte'],
  //     },
  //   },

  //   rules: {
  //     'svelte/no-target-blank': 'error',
  //     'svelte/button-has-type': 'warn',

  //     'svelte/html-self-closing': [
  //       'error',
  //       {
  //         void: 'always',
  //         component: 'always',
  //         svelte: 'always',
  //       },
  //     ],
  //   },
  // },
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/ban-tslint-comment': 'error',
    },
  },
  {
    ignores: ['**/*.d.ts', 'dist/*', 'package.json', '**/node_modules/**'],
  },
  {
    plugins: {
      perfectionist,
      react,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'sort-keys-plus': eslintPluginSortKeysFix,
      // toml: eslintPluginToml,
      'typescript-sort-keys': eslintPluginTypeScriptSortKeys,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      //https://johnnyreilly.com/typescript-eslint-no-unused-vars
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      'arrow-body-style': 'error',
      'astro/no-unused-css-selector': 'warn',
      'import/order': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/label-has-associated-control': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-extra-semi': 'off',
      'no-prototype-builtins': 'off',
      'object-shorthand': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
      ],

      'perfectionist/sort-astro-attributes': 'off',

      // 'simple-import-sort/exports': 'warn', // will ignore imports for now since prettier handles this
      // 'simple-import-sort/imports': 'warn',
      'sort-imports': 'off',

      'sort-keys-plus/sort-keys': 'warn',
      // This rule will be enabled in the future
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'warn',
      'typescript-sort-keys/interface': 'warn',
      'typescript-sort-keys/string-enum': 'warn',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  eslintConfigPrettier,
  {
    ignores: [
      '**/dist/',
      '**/node_modules/',
      'temp/',
      'src/js/**',
      '.trunk/*',
      '/node_modules/*',
      '.netlify/*',
      'tsconfig.json',
      'swiper-bundle.min.js',
    ],
  },
)
