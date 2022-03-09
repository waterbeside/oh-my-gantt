module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'env': {
    'node': true
  },
  'rules': {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
          'multiline': {
              'delimiter': 'none',
              'requireLast': false
          },
          'singleline': {
              'delimiter': 'comma',
              'requireLast': false
          }
      }
    ],
    'semi': [2, 'never'],
    'quotes': [2, 'single']
  }
}