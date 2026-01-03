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

## CHILD PROCESSES

-   Achild process is a separate instance of any program that runs independently from main program
-   in this case `toolbox ` is the parent process
-   When we call:_spawn("node",[entry])_ node creates a new process to run in the [entry] file
-   **this child process can run parrallel with the CLI and has its own memmory, env ad standard input/output**

```js
const entry = join(cwd, 'node_modules', 'toolbox', 'bin', 'index.js');
logger.highlight('Starting the app');
//spawn child process
const child = spawn('node', [entry], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(config.port) },
});
```

1. `node`--> command to run (NODEJS)
2. `[entry]`--> arguments: Int htis case its the path to the child script
3. `OptionsObject:{cwd,stdio,env}`-->
    - [cwd]: sets the current working directory for the child
    - [stdio:"inherit"]: means child shares parent terminal
    - [env]: we pass everything from parent `process.env` and we overide /add`PORT`

-   Achildprocess is an [EventEmitter] so you cnalisten to events like

**.on("exit",callback)**

-   Fired when child process exits naturally
    [code] is the exit code and`0= success, nonzero = error`

**.on("error",callback)**

-   Fired if node cant fire the child process atall
    **_NB: ["exit"] fires when the processrun s but finishes, ["error"] fires before the process even starts_**
    **.on("close",callback)**
-   Fires after all[stdio-streams] are closed. Ofteused to clean up resources
    **_NB: ["exit"] fires when the process finishes, ["close"] process finishes and all output streams flushed_**

**.on("disconnect")**

-   Fires when [IPC] channel between parent and child is discconected
-   Only relevant if you spawned the child with `{stdio:["pipe","pipe","pipe","ipc]}`

**.on("error",callback)**

-   Fires when the child sends a message via process.send() (IPC).

-   Only works if you spawned with { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] }.
    **_IPC: interprocess communication==> the way two processes talk to each other_**
