import { type FlatXoConfig } from 'xo'

const xoConfig: FlatXoConfig = [
  {
    semicolon: false,
    space: 2,
    rules: {
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/block-spacing': ['error', 'always'],
      'no-warning-comments': 'off',

      // Conflicts with erasable sintax
      '@typescript-eslint/parameter-properties': 'off',

      'unicorn/prevent-abbreviations': 'off',
      'import-x/no-absolute-path': 'off',

      // Remove legacy global React import requirements
      'react/react-in-jsx-scope': 'off',

      // Remove legacy prop type declaration
      'react/prop-types': 'off',

      // Fix indent: start
      '@stylistic/indent': ['error', 1, { ignoredNodes: ['JSXElement', 'JSXOpeningElement', 'JSXClosingElement'] }],
      '@stylistic/no-tabs': 'error',
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      // Fix indnet: end

      // File name NEVER works in react project, as we have PascalCase react component file and kebab-case normal tsx file
      'unicorn/filename-case': 'off',

      // Never works with tsx
      '@stylistic/function-paren-newline': 'off',

      // Never works with tsx
      '@stylistic/comma-dangle': 'off',
    },
    react: true,
    settings: {
      react: {
        version: 'detect',
      }
    }
  },
]

export default xoConfig
