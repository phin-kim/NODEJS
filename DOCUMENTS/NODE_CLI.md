# CREATING MY OWN NODE CLI

- I am creating my CLI from the repo (build your own x)[https://citw.dev/tutorial/create-your-own-cli-tool]

- When initialy installing the package.json it comes preinstalled with [commonJs] and Iprefer using [ESM] so to change it this command was used

```bash
npm pkg set type=module
```

## HASHBANG

```bash
#!/usr/bin/env node

```

- This ensures that the script runs even if node isnt installed ina fixed location.It says find the `node` executable in the systemPATH and use it to run this script
- It used tomake the script _cross-platform-friendly_

## CREATING A SYMLINK

- In one `tool` directory do

```bash
npm link
```

- then in the other directory `testProject`

```bash
npm link tool
```

- In the `tesProject dirrectory` there is a node modules crated tht points using [symlink] to the script createdin `tool`

- This tells npm: “Use the globally linked version of my-package here.”

- Instead of installing from npm registry, your project will use the local folder.

- ✅ Any changes you make to my-package locally will immediately be reflected in my-app.

## RUNNING MULTIPLE COMMANDS

- Since the tool is supposed to run muoltple commands, we needout tool to process various auruments and for that we can use node's built-in `[process.argv]`
- Running with [console.log(process.agrv)] we get the output When we run _tool --start_

```bash
]
PS C:\Users\USER\Desktop\hands-on-NODE\testProject> tool --start
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\USER\\AppData\\Roaming\\npm\\node_modules\\tool\\bin\\index.js',
  '--start'
]
```

- the first menber of the aarray is This is the Node program that is running your code.“Which Node executable started me?”
- The second mener of the array This is the file Node is executing.“Which JavaScript file is running?”
- The thrid meber This is what YOU typed after the command name "What instructions did the user give me?”.

## ADDING COLOR TO THE CONSOLE

```bash
npm install chalk
```

- If we want to read `testproject/package.json` the tool is running from `tool/bin/index.js` so if we do _import pkg from "./package.json'_ node will belooking for `tool/pakage.json`
  **NB**Key idea to remember 🧠

- A CLI runs from your tool’s folder,
  but it is executed from the user’s folder.We must detect where the user ran the command from, not where the tool lives.
- So to solve this issue node has [process.cwd] which mean _Current Working Directory_
- “Where was the user standing in the terminal when they typed the command?”
- We use process.cwd() because a CLI must read files from the user’s project, not from its own folder.

## COSMICONFIG

Think of cosmiconfig as a super-smart robot helper.

It can:

- Look in all the toy boxes (folders) automatically, Read all kinds of notes (JSON, JS, YAML ,Remember the notes it already read (caching)

- Work even if the note is a little story and has logic (async search)

- Basically, it solves all the hard work for you. Your robot doesn’t have to check every file and figure out what it is — cosmiconfig does it.
- When you create a loader

```js
export default {
  port: "6666",
};
```

- it searches for the configuration named `tool` in the following order

| Location / File         | How it’s interpreted                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| package.json            | Looks for a "tool" field. Only this field is returned.                    |
| tool.config.js          | Uses whatever is exported (object, function, etc.). No "tool" key needed. |
| tool.config.json        | Uses the JSON object directly.                                            |
| tool.config.yaml / .yml | Parses YAML and returns it.                                               |

- It stopps at the first file it finds seearches up the directory tree untill it reaches the fiesystem root
- _ajv_ is used for validation according to the schema provided.

## LOGGING

- There are great logging libraries such as [winston] and [bunyan] but in this case we want to see how stuff happen behind the scenes so we'll implement the logger on our own.

### DEBUG

- After installing [debug] in windows powershell u cant do

```bash
## install debug
npm i debug
DEBUG=* tool --start
## instead set it up in the env NB only works for that session
$env:DEBUG="*"
tool --start
## to setup multiple directories
$env:DEBUG="commands:*,bin
```

- It helps regulate the logs shown

1. Fine-grained control: Only show logs from certain modules.

2. No need to remove console.log: You can leave debug calls in production.

3. Namespaces: Organize logs by module (commands:start, config:mgr, etc.).

4. Works cross-platform: Works in CLI, Node scripts, servers, etc.
