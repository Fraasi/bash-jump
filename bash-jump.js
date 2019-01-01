const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

let folderCount = 0
let found = false
let width = process.stdout.columns - 9
let returnPath
let openBash
let startTime

function findDir(dirToFind, startDir = process.cwd(), bash) {
  if (folderCount === 0) {
    openBash = bash
    console.log(`\n Searching for folder '${dirToFind}'\n Starting from '${startDir}'\n`)
  }

  if (!found) {
    ++folderCount
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(` ${folderCount}...${startDir}`.slice(0, width) + '...')

    const files = fs.readdirSync(startDir)
    for (file of files) {
      let isDir
      try {
        isDir = fs.lstatSync(path.join(startDir, file)).isDirectory()
      } catch (e) {
        /*
        * Error: EPERM: operation not permitted, lstat
        * Error: EBUSY: File is busy
        * Silently just jump over & continue
        */
      }
      if (isDir && (file === dirToFind)) {
        found = true
        returnPath = path.join(startDir, file)
        return
      } else if (isDir && !found && file !== 'node_modules' && file !== '.git') {
        findDir(dirToFind, path.join(startDir, file))
      }
    }
  }
}

function end() {
  const stopTime = new Date()
  const time = ((stopTime - startTime) / 1000).toFixed(2)
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const print = returnPath ? `Found folder!\n path: '${returnPath}'` : 'No such folder found!'
  console.log(` Traversed ${folderCount} folders in ${time}s\n ${print}`)

  if (found && returnPath && openBash) {
    try {
      spawn('start "" "C:\\Program Files\\Git\\bin\\sh.exe" --login', {
        shell: true,
        cwd: returnPath,
        detached: true,
        stdio: 'ignore'
      })
      console.log('\n Opening new git bash...')
    } catch (e) {
      console.log('\n Spawn error: ', e);
    }
  }
}

function init(dirToFind, startDir, bash) {
  startTime = new Date()
  findDir(dirToFind, startDir, bash)
  end()
}

module.exports = init;
