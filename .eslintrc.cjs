// only lint files in the src directory

module.exports = {
  ...require('@hyperplay/eslintconfig'),
  ignorePatterns: ['!src', 'vite.config.ts', '.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
}
