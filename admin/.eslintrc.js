module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'class-methods-use-this': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'import/no-extraneous-dependencies': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/no-unresolved': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
