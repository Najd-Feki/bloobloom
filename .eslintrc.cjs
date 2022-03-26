/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    // "typescript-eslint/no-empty-function": "warn",
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-empty-function': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-extra-parens': 'off',
    'no-return-await': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'space-before-function-paren': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
    'prefer-const': 'error',
    'no-console': 'warn',
    'no-const-assign': 'error',
    camelcase: 'off',
    'import/extensions': 'off',
    'no-case-declarations': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'import/no-anonymous-default-export': 'off',
    'no-var': 'error',
    '@typescript-eslint/no-use-before-define': ['off'],
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'max-len': ['warn', { code: 140 }],
    'prefer-promise-reject-errors': ['off'],
    'no-return-assign': ['off'],
    'import/no-cycle': [0, { maxDepth: 3 }],
    'import/imports-first': 0,
    'max-lines': ['warn', 165],
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 'warn',
    'no-use-before-define': 0,
    'prefer-template': 2,
    'require-yield': 0,
    'arrow-spacing': 'warn',
    'no-shadow': 'off',
    'newline-before-return': 'warn',
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
