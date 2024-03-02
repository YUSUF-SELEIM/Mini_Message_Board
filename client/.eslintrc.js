module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
  },
  plugins: [
      '@typescript-eslint',
  ],
  rules: {
      '@typescript-eslint/no-unused-vars': 'error',
  },
  env: {
      browser: true,
  },
};