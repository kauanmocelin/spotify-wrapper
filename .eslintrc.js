module.exports = {
  env: {
    browser: true,
    es2020: true,
    mocha: true
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {},
  overrides: [
    {
      files: '*.spec.js',
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
