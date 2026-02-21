import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'
import importPlugin from 'eslint-plugin-import'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'src/pages/generated']),

  // Brower stuff.
  {
    files: ['src/**/*.{ts,tsx}', '*.ts', '*.tsx'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylistic,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      unicorn.configs.recommended,
    ],
    plugins: {
      import: importPlugin,
      react: react,
      '@stylistic': stylistic,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after'
            },
          ],
          'newlines-between': 'never',
        },
      ],
      'import/no-cycle': 'error',
      'import/extensions': ['error', 'always', { ignorePackages: true }],

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'only-multiline',
        'importAttributes': 'always-multiline',
        'dynamicImports': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'always-multiline',
        'tuples': 'always-multiline'
      }],
      '@stylistic/jsx-tag-spacing': ['error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'never',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],

      // Not works with tsx files.
      'unicorn/filename-case': 'off',

      // Abbr is useful.
      'unicorn/prevent-abbreviations': 'off',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        'typescript': {
          'project': './tsconfig.app.json'
        }
      }
    }
  },

  // Script stuff.
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'scripts/**/*.{ts,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylistic,
      tseslint.configs.stylisticTypeChecked,
      unicorn.configs.recommended,
    ],
    plugins: {
      import: importPlugin,
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2023,
      },
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.node.json'
        }
      }
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          alphabetize: { order: 'asc', caseInsensitive: false },
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' }
          ],
          'newlines-between': 'never',
        },
      ],
      'import/no-cycle': 'error',
      'import/extensions': ['error', 'always', { ignorePackages: true }],

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'only-multiline',
        'importAttributes': 'always-multiline',
        'dynamicImports': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'always-multiline',
        'tuples': 'always-multiline'
      }],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Abbr is useful.
      'unicorn/prevent-abbreviations': 'off',
    },
  }
])
