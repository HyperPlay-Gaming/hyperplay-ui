const { join } = require('path')
const { unlinkSync } = require('fs')

const from = join(__dirname, '../src/fonts')

try {
    unlinkSync(from)
} catch (e) {
    console.log(e)
}