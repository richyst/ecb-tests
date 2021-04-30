module.exports = {
"extends": [
  "eslint:recommended",
  "plugin:@typescript-eslint/eslint-recommended",
  'plugin:jsdoc/recommended',
  'plugin:@typescript-eslint/recommended'
],
"env": {
  "node": true
},
"parser": "@typescript-eslint/parser",
"plugins": [
  "@typescript-eslint",
],
"settings": {
  "import/parsers": {
    "@typescript-eslint/parser": [
    ".ts",
    ".tsx"
  ]
  },
  "import/resolver": {
    "typescript": {} 
  }
},
"parserOptions": {
  "project": "./tsconfig.json",
  "tsconfigRootDir": "./",
  "sourceType": "module",
  "ecmaVersion": 2018
},
"rules": {
  "@typescript-eslint/no-explicit-any": "off",
  'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
  }
}
