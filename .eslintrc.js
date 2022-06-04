module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015
  },
  // required to lint *.vue files
  extends: [
    "vue", 
    "standard",
    "plugin:vue/recommended"
  ],
  plugins: [
    "import",
    'vue'
  ],
  // add your custom rules here
  rules: {
  }
}

