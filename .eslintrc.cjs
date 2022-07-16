module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier",
  ],
  rules: {
    // 'vue/no-unused-vars': 'error'
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off"
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.vue']
      }
    }
  },
}
