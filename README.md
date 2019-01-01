# Bash-jump

Node CLI to quickly open git-bash in another folder.

### todo
* [ ] read starting folder from env variable id set, otherwise current folder start
* [ ] Maybe use [this](https://www.npmjs.com/package/folder-walker), instead my own 'algorithm'...
* [ ] add open explorer flag

## Features & other related ramblings

* Brute force search :muscle:
* **Case** (and **typo**) **sensitive!**, 'Folder' =!= 'folder' & starting directory must exist or  (╯°□°)╯︵ ┻━┻
* On find, runs 'start "" "C:\\Program Files\\Git\\bin\\sh.exe" --login', so needs to have git bash installed to work
* --no-bash or -B, finds folder and path, but does not open new bash.
* Default search start is current folder or, if env variable is set, the folder set in env variable.


* node_modules & .git folders excluded from search to keep it fast.  

All included:
```
$ node index.js

 Searching for 'folder-find'
 Starting from 'G:\Code\'

 Traversed 31286 folders in 490.20s
 Found path: G:\Code\JavaScript\Nodejs\folder-find
```
After excluding node_modules & .git:
```
$ node index.js

 Searching for folder 'folder-find'
 Starting from 'G:\Code'

 Traversed 1060 folders in 2.66s
 Found path: 'G:\Code\JavaScript\Nodejs\folder-find'
```
