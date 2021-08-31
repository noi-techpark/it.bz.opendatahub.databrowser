module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "@open-wc/eslint-config",
    "eslint-config-prettier"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  // add your custom rules here
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
    // Need to configure eslint "no-shadow" rule for typescript
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/no-unresolved": "off",
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/*.test.ts"] }],
    "lit-a11y/no-invalid-change-handler": "off",
    "class-methods-use-this": "off"
  },
};
