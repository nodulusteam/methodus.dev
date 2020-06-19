# -methodus-cli
@methodus/cli

The easies way to setup a new Methodus application is using the CLI.

## Commands
`methodus` -  will display the options menu -> 
```bash
? What project template would you like to generate? (Use arrow keys)
> application
  controller
  module
  service
```

`methodus application [name]` - creates a new Methodus application

`methodus generate controller [name]` - creates a new Methodus application
`methodus generate module [name]` - creates a new Methodus application
`methodus generate service [name]` - creates a new Methodus application

add `--module` to specify in which module to create the item. e.g.

`methodus g c MyControll --module=MyModule`