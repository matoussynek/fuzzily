# fuzzily

An easy-to-use file fuzzy finder for vscode that works better than the default file finder for navigating file structures with repeating file names. (at least for me it does)

## How to use

fuzzily add a keyboard shortcut `ctrl + shift + z` (or `cmd + shift + z` for those with lack of taste).
Alternatively use the comamnd pallete and search for *fuzzily: File Finder*

Example file structure:

<img src="fuzzily.png" width="320"/>

You can use *fuzzily* like a normal file finder and search for `file.txt` however many results would come up and in no way it makes the life easier.

The true power of *fuzzily* comes when you are searching for a specific file and you roughly know the path to it. In addition to searching for a filename (or a substring of it) it is possible to specify one or more directories (or a substring of its name) on a path to that file. This can come in handy when there are multiple files with same filename across a workspace.

### Syntax
* The directories are specified from **left to right** (as in a normal filepath) and are separated by a **space** eg. ``B E file.txt``, ``C D file.txt``
* The last part of the prompt MUST refere to a filename
* Substrings can be used eg. instead of ``Another file.txt`` you can use ``An f``, ``no txt``, ``r f``, etc...
* The prompts are **case insensitive**

### Examples
* when searching for `A/file.txt` the prompt could be ``a file`` (`Another/file.txt` is also included in the results)
* when searching for `B/D/file.txt` the prompt to return only that file is ``b d f``. The prompt ``d f`` returns `B/D/file.txt` and `C/D/file.txt`

## Extension Settings

This extension contributes the following settings:

* `fuzzily.resultLimit`: Sets max number of displayed results. (default: 20)

## Release Notes

### 0.0.1

Initial release of of *fuzzily*

### 0.0.2

Readme/usecases update

---
## For more information

* [GitHub](https://github.com/matoussynek/fuzzily)

**Enjoy!**
