const globals = require('globals');
const pluginJs = require('@eslint/js');

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  { rules: { semi: ['warn', 'always'] } },
];
