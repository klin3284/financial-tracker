module.exports = {
  plugins: ['prettier', 'import', 'react'],
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  ignorePatterns: ['/*.*'],
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        modifiers: ['global', 'const'],
        types: ['boolean', 'number', 'string', 'array'],
        format: ['UPPER_CASE'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
  },
  overrides: [
    {
      files: ['src/app/api/**/*.ts', 'src/components/ui/**/*.tsx'],
      rules: {
        'import/prefer-default-export': 0,
      },
    },
  ],
};
