#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const bashJump = require('./bash-jump.js')

program
  .version(pkg.version)
  .name('bj')
  .option('-B, --no-bash', 'find folder and path, do not open bash')
  .option('-e, --explorer', 'find folder and path and open file explorer')
  .arguments('<folderToFind> [startSearchFrom]')
  .action(function (folderToFind, startSearchFrom) {
     dirToFind = folderToFind
     startDir = startSearchFrom
  })
  .parse(process.argv)
 
if (typeof dirToFind === 'undefined') {
   console.error('\n You must specify a folder to search!')
   process.exit(1)
}

if (!startDir) startDir = process.env.BASH_JUMP
bashJump(dirToFind, startDir, program.bash, program.explorer)
