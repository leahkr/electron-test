const { on } = require('events');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'server/tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    // If js files are not created in the same directory as ts files. To avoid "Unable to resolve path to module" ESLint error
    'import/resolver': {
      node: {
        paths: ['dist'], // js files directory
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/explicit-member-accessibility': ['warn', { overrides: { constructors: 'no-public' } }],
    '@typescript-eslint/no-use-before-define': ['warn', { functions: false }],
    'no-use-before-define': ['warn', { functions: false }],
    'class-methods-use-this': ['off'],
    'no-plusplus': ['off'],
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-syntax': ['warn'],
    'no-await-in-loop': ['warn'],
    'import/prefer-default-export': ['off'],
    'prefer-promise-reject-errors': ['warn', { allowEmptyReject: true }],
    '@typescript-eslint/no-parameter-properties': ['off'],
    'no-empty-function': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-unused-expressions': ['off'],
    'no-return-assign': ['error', 'except-parens'],
    'no-useless-constructor': 'off',
    'no-console': 1,
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
