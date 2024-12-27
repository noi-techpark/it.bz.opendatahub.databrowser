// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    files: ['**/*.{ts,vue}'],
    // Temporarily turn off the report of unused disable directives
    // to not overload the eslint-update commit with changes. We will
    // remove this config later on.
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    },
    rules: {
      // Temporarily turn off the recommended rules to not overload the
      // eslint-update commit with changes. We will enable them one by one
      // later on.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "prefer-const": "off",
    }
  },

  skipFormatting,
]