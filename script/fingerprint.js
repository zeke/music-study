#!/usr/bin/env node

require('make-promises-safe')
require('dotenv-safe').load()
const {inspect, promisify} = require('util')
const acoustid = promisify(require('acoustid'))
const fpcalc = promisify(require('fpcalc'))
const os = require('os')
const path = require('path')

const fpcalcOptions = {command: path.join(__dirname, '../fpcalc')}
// const file = path.join(os.homedir(), 'Google/Music/iTunes/iTunes Music/Lionel Hampton/Tempo And Swing/12 Flying Home.mp3')

const file = path.join(__dirname, '../flying-home.mp3')

console.log(file)
async function main () {
  const opts = {
    key: process.env.ACOUSTID_API_KEY,
    fpcalc: fpcalcOptions
  }
  const result = await acoustid(file, opts)
  console.log(JSON.stringify(result, null, 2))

  const fingerprint = await fpcalc(file, fpcalcOptions)
  console.log(fingerprint)
}

main()
