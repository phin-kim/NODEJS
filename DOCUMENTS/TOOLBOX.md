# CUSTOM TOOLBOX

**_SCAFFOLD_**

-   It means generate boilerplate files/ folders
-   WHne user runs `toolbox --init` the CLI should start from where they are and generate the boilerplate files from there not in its own sourcode files

```js
const cwd = process.cwd(); // where user ran tool

// paths
const srcDir = join(cwd, 'src');
```

-   Lets say the current directory is [/USER/phinehas/my-app]. the `srcDir` would return [/USER/phinehas/my-app/src]
-   "The recursive: true option in fs.mkdir() tells Node to create all necessary parent directories if they don’t exist, and not to throw an error if the target directory already exists. This ensures safe, idempotent folder creation in user projects."
