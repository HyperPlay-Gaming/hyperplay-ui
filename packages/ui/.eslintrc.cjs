// only lint files in the src directory

module.exports = {
  ...require('@hyperplay/eslintconfig'),
  ignorePatterns: ['!src'],
}
