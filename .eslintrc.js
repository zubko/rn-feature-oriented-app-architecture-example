module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-nested-ternary': 'off',
  },
  globals: {
    __DEV__: true,
    window: true,
    fetch: true,
  },
  plugins: ['prettier'],
};
