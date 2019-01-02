# Bash-jump

Node CLI to quickly open git-bash in another folder.

### todo
* [ ] Maybe use [this](https://www.npmjs.com/package/folder-walker), instead my own 'algorithm'...
* [ ] add open explorer flag

## Features & other related ramblings

* Brute force recursive search :muscle:
* **Case** (**& typo**) **sensitive!** 'Folder' !== 'folder' & starting directory must exist or  (╯°□°)╯︵ ┻━┻
* Default search start is current folder, or if `BASH_JUMP` env variable is set, the folder set in env variable, or the second argument.
* To set env variabe: `$ export BASH_JUMP=G:\\MyFolder` for example.
* On find, runs `start "" "C:\\Program Files\\Git\\bin\\sh.exe" --login`, so needs to have git bash installed to work.
* Flags:
  * --no-bash or -B, finds folder and path, but does not open new bash shell.

## Usage

To search for myProject folder starting from current (or env variable if set) folder:  
`$ bj myProject`  
To search for myApplication folder in program files without opening new shell:  
`$ bj -B myApplication "C:\\Program Files"`  



* node_modules & .git folders excluded from search to keep it fast.  

All included:
<pre>
 Searching for 'folder-find'
 Starting from 'G:\Code\'

 <b>Traversed 31286 folders in 490.20s</b>
 Found path: G:\Code\JavaScript\Nodejs\folder-find
</pre>
After excluding node_modules & .git:
<pre>
 Searching for folder 'folder-find'
 Starting from 'G:\Code'

 <b>Traversed 1060 folders in 2.66s</b>
 Found path: 'G:\Code\JavaScript\Nodejs\folder-find'
</pre>
