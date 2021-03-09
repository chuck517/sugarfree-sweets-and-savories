module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'amd': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 9,
    'ecmaFeatures': {
      'ecmaVersion': 2018,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': ['react', 'json'],
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'latest'
    }
  },
  'rules': {
    'indent': ['error', 2],
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-undef': 0,
    'no-unsued-vars': 0,
    'quotes': ['error', 'single'],
    'react/prop-types': 0,
    'react/display-name': 0,
    'semi': ['error', 'always'],
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error'
  }
};