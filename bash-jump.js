const path = require('path')
const fs = require('fs')
const { spawn, exec } = require('child_process')

let folderCount = 0
let found = false
let width = process.stdout.columns - 9
let returnPath
let openBash
let openExplorer
let startTime
const command = process.platform === 'win32' ? 'start bash --login' : 'bash --login'


function findDir(dirToFind, startDir = process.cwd(), bash, explorer) {

  if (folderCount === 0) {
    openBash = bash
    openExplorer = explorer
    console.log(`\n Searching for folder '${dirToFind}'\n Starting from '${startDir}'\n`)
    dirToFind = dirToFind.toLowerCase()
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
        * Silently just jump over & continue recursion
        */
      }
      if (isDir && (file.toLowerCase() === dirToFind)) {
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
  const print = returnPath ? `Found folder!\n Path: '${returnPath}'` : 'No such folder found!'
  console.log(` Traversed ${folderCount} folders in ${time}s\n ${print}`)

  if (found && returnPath && openBash) {
    console.log('\n Opening new git bash...')
    spawn(command, {
      shell: true,
      cwd: returnPath,
      detached: true,
      stdio: 'ignore'
    })
      .on('error', e => console.log('Spawn shell error: ', e))
  }
  if (found && returnPath && openExplorer) {
    console.log('\n Opening file explorer...')
    // start had some path problems & weird behaviour, explorer seems to work
    const platform = process.platform === 'win32'
      ? 'explorer'
      : process.platform === 'darwin'
        ? 'open'
        : 'nautilus'
    exec(`${platform} ${returnPath}`)
      .on('error', e => console.log('Open explorer error: ', e))
  }
}

function bashJump(dirToFind, startDir, bash, explorer) {
  if (dirToFind === '.') {
    console.log('\n Opening new git bash...')
    spawn(command, {
      shell: true,
      cwd: process.cwd(),
      detached: true,
      stdio: 'ignore'
    })
      .on('error', e => console.log('Spawn shell error: ', e))
    return
  }
  startTime = new Date()
  findDir(dirToFind, startDir, bash, explorer)
  end()
}

module.exports = bashJump;
