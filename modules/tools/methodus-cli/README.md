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



<!-- tabs:start -->
#### ** Reference **

[filename](index.html ':include')
 
#### ** Tests overview **

[tests](test_dashboard.html ':include :type=iframe width=100% height=100%')



<!-- tabs:end -->