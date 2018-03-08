#!/usr/bin/env node

require('make-promises-safe')

const music = require('music-metadata')
const {inspect} = require('util')
const path = require('path')
const os = require('os')
const walk = require('walk-sync').entries
const db = require('../lib/db')
const validExtensions = ['m4a', 'mp3', 'ogg']
const musicDir = path.join(os.homedir(), 'Google/Music/iTunes/iTunes Music')
const files = walk(musicDir, {directories: false})
  .filter(isValidFile)
  .map(file => {
    return Object.assign(
      {
        fullPath: path.join(file.basePath, file.relativePath)
      },
      file
    )
  })

function isValidFile (file) {
  const ext = path.extname(file.relativePath).substring(1).toLowerCase()
  return validExtensions.includes(ext)
}

async function main () {
  for (file of files) {
    let data = await music.parseFile(file.fullPath).catch(err => {
      console.error(file.fullPath)
      console.error(err)
    })

    if (!data) continue

    let result = {
      file: file,
      data, data
    }
    db.put(file.fullPath, result)
    if (file.fullPath.toLowerCase().includes('lionel')) {
      // console.log('\n\n\n')
      console.log(file.fullPath)
      // console.log(inspect(result))
    }
  }
}

main()