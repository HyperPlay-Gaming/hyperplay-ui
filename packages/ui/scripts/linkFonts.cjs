const { symlinkSync } = require('fs')
const { join } = require('path')
console.log(__dirname)

const from = join(__dirname, '../src/fonts')
const to = join(__dirname, '../public/fonts')

try {
  symlinkSync(to, from, 'dir')
} catch (e) {
  console.log(e)
}
