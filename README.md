# Bash-jump

Node CLI to quickly open git-bash (or file explorer) in another folder.  

**Note:** This could have some bugs in linux & mac. I have no way of testing/developing on these platforms. If you want to help/encounter a bug, please file an issue at github and I'll see what I can do. 

  
## Install  [![npm version](https://img.shields.io/npm/v/bash-jump.svg?colorB=green&style=plastic&label=npm)](https://www.npmjs.com/package/bash-jump)

```
$ npm install -g bash-jump
```

## Features & other related ramblings

* Brute force recursive search :muscle:
* **Case** (& [typo](https://i.imgur.com/Kaa8zvg.jpg)) **sensitive!** 'Folder' !== 'folder' & starting directory must exist or  (╯°□°)╯︵ ┻━┻
* Default search start is current folder, or if `BASH_JUMP` env variable is set, the folder set in env variable, or the second argument.
* To set env variabe: `$ export BASH_JUMP=G:\\MyFolder` for example to start default search from 'G:\MyFolder'-folder.
* To remove it: `$ unset BASH_JUMP`.
* On find, runs `bash --login`, so needs to have git bash installed to work.
* If folder to search is just a dot ('.'), opens new shell in current folder.
* The 'child program' can't close the parent shell it is running from, so there's no option for that. If you want to close the current shell after search, just add `&& exit` to the end. But be careful with your search, this will close the current shell wether the program opens a new one or not.


## Usage

```
$ bj -h
Usage: bj [options] <folderToFind> [startSearchFrom]

Options:
  -V, --version   output the version number
  -B, --no-bash   find folder and path, do not open bash
  -e, --explorer  find folder and path and open file explorer
  -h, --help      output usage information
```


### Examples
To search for myProject folder starting from current (or env variable if set) folder and open new shell is simple:  
`$ bj myProject`  
To search for myApplication folder in program files without opening new shell, but opening file explorer:  
`$ bj -Be myApplication "C:\\Program Files"`  
To open new shell for the current folder just use a dot for the folder to search:  
`$ bj .`  


#### Node_modules & .git folders excluded from search to keep it fast.  

All folders included in search:
<pre>
$ bj -B find-me G:\\Code

 Searching for folder 'find-me'
 Starting from 'G:\Code'

 <b>Traversed 31286 folders in 490.20s</b>
 Found folder!
 Path: 'G:\Code\JavaScript\Nodejs\find-me'
</pre>
After excluding node_modules & .git:
<pre>
$ bj -B find-me G:\\Code

 Searching for folder 'find-me'
 Starting from 'G:\Code'

 <b>Traversed 1069 folders in 2.64s</b>
 Found folder!
 Path: 'G:\Code\JavaScript\Nodejs\find-me'
</pre>
