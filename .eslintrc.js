module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'comma-dangle': 0,
    "linebreak-style": [0 ,"error", "windows"],
    "no-new": 0,
    "no-alert": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
