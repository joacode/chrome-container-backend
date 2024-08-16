module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'es2022',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'unicorn/prefer-top-level-await': 'off',
    'import/no-unresolved': 0,
    'import/order': [
      2,
      {
        alphabetize: { order: 'asc' },
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.{test,spec}.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
};
