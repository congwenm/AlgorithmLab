###Options

1. iron-node
> npm i -g iron-node
iron-node FILE [--param1=foo --param2=bar];


2. default debug (built in)
> node debug FILE

- use debugger
```
  continue – cont, c
  step – next, n
  step in – step, s
  step out – out, o
```



3. node inspector, debug using chrome
> npm i -g node-inspector
then use this to open it up debugging console in your default browser
> node-debug FILE_PATH --debug-brk
