const path = require('path')
const level = require('level')

module.exports = level(path.join(__dirname, '../db'), {
  valueEncoding: 'json'
})
