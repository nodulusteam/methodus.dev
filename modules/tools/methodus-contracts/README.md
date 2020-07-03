# Methodus
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-contracts&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-contracts&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-contracts&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-contracts&metric=vulnerabilities "coverage")



## @Methodus contracts builder.
This package is part of the Methodus architecture. It's purpose is generating contract packges of the server code, to be used by JavaScript browser / server clients.


### build.json instructions file
```json
{
    "models": {
        "contractNameServer": "@server/models",
        "contractNameClient": "@client/models",
        "buildPath": "./build_path/",
        "path": "build_vars/models",
        "buildFolder": "./",
        "models": {
            "UserModel": {
                "path": "./models/user.model.ts"
            },
            "GroupModel": {
                "path": "./models/group.ts"
            }
        },
        "npmrc": "./.npmrc",
        "contracts": {
            "DataController": {
                "path": "./controllers/datacontroller.ts"
            },
            "Models": {
                "path": "./controllers/models.controller.ts"
            }
        },
        "includes": {
            "Mock": {
                "alias": "mocker",
                "path": "../../build_mocks/mock.ts"
            }
        },
       
        "dependencies": {}
    }
}

```




## Install
Install globally using `npm i -g @methodus/contracts`

### usage:
In the root folder of the package execute:

Client contracts
`contracts-client build.json`

Server contracts
`contracts-server build.json`


