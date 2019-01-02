#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const bashJump = require('./bash-jump.js')

program
  .version(pkg.version)
  .option('-B, --no-bash', 'find folder and path, do not open bash')
  .arguments('<folder> [start]')
  .action(function (folder, start) {
     dirToFind = folder
     startDir = start
  });
 
program.parse(process.argv)
 
if (typeof dirToFind === 'undefined') {
   console.error('\n You must specify a folder to search!')
   process.exit(1)
}
// console.log('dirToFind:', dirToFind);
// console.log('bash', program.bash)
// console.log(process.env.BASH_JUMP)

if (!startDir) startDir = process.env.BASH_JUMP
console.log('startDir:', startDir);
bashJump(dirToFind, startDir, program.bash)
