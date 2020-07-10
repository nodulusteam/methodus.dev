## @Methodus contracts builder.

This package is part of the Methodus tollbelt. It's purpose is generating contract packages of the server code, to be used by JavaScript browser / server clients.

## Install

Install globally using `npm i -g @methodus/contracts`

### usage:

In the root folder of the package execute:

Client contracts
`contracts-client build.json`

Server contracts
`contracts-server build.json`

To generate a contract package you'll need a `build.json` file to instruct the builder what to inclode in the package.

### build.json instructions file

```json
{
    "models": {
        "contractNameServer": "@server/models", //the name of the server contract package
        "contractNameClient": "@client/models", //the name of the client contract package
        "buildPath": "./build_path/", // optional, where to build the package. defaults to cwd.
        "path": "build_vars/models", // optional, the path to the source package. defaults to cwd.
        "npmrc": "./.npmrc", // optional, usefull for private registry and custom npm settings, will copy the file into the package directory
        "models": {
            // models using @Model decorators
            "UserModel": {
                "path": "./models/user.model.ts"
            },
            "GroupModel": {
                "path": "./models/group.ts"
            }
        },
        "contracts": {
            // classes using @MethodConfig decorators
            "DataController": {
                "path": "./controllers/datacontroller.ts"
            },
            "Models": {
                "path": "./controllers/models.controller.ts"
            }
        },
        "includes": {
            // any file the package may need
            "Mock": {
                "alias": "mocker",
                "path": "../../build_mocks/mock.ts"
            }
        },
        "dependencies": {}
    }
}
```

The `build.json` file can contain more than one project

```json
{
    "models": {
        "contractNameServer": "@server/models",
        "contractNameClient": "@client/models"
    },
    "integrations": {
        "contractNameServer": "@server/integrations",
        "contractNameClient": "@client/integrations"
    }
}
```
