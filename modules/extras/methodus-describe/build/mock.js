"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mock = void 0;
class Mock {
    static action(className, actionKey) {
        return {
            "base": "//localhost:8020", "methodus": {
                "_events": {}, "_descriptors": {
                    "get": {
                        "verb": "GET", "route": "/simple/get", "propertyKey": "get", "params": [{ "type": "string", "from": "params", "index": 0, "name": "id" }]
                    },
                    "list": {
                        "verb": "GET", "route": "/api/player",
                        "propertyKey": "list", "params": [{ "type": "string", "from": "headers", "index": 0, "name": "auth" },
                            { "type": "object", "from": "query", "index": 1, "name": "order_by" }]
                    }
                }, "name": "ProxiedController"
            }, "actionKey": "get"
        };
    }
    static dashbaord() {
        return {
            "routes": [{
                    "info": {}, "active": true, "methodus": {
                        "_events": {}, "_descriptors": {
                            "get": {
                                "verb": "GET", "route": "/simple/get", "propertyKey": "get", "params": [{ "type": "string", "from": "params", "index": 0, "name": "id" }]
                            }
                        }, "name": "ProxiedController"
                    }, "name": "ProxiedController"
                },
                {
                    "info": {}, "active": true, "methodus": {
                        "_events": {}, "_descriptors": {
                            "list": {
                                "verb": "GET", "route": "/api/player",
                                "propertyKey": "list", "params": [{ "type": "string", "from": "headers", "index": 0, "name": "auth" },
                                    { "type": "object", "from": "query", "index": 1, "name": "order_by" }]
                            },
                            "listdefaults": {
                                "verb": "GET", "route": "/api/player/desfaults",
                                "propertyKey": "listdefaults", "params": [{ "type": "object", "from": "params", "index": 0 },
                                    { "type": "object", "from": "body", "index": 1 }, { "type": "object", "from": "headers", "index": 2 },
                                    { "type": "object", "from": "files", "index": 3 }, { "type": "object", "from": "cookies", "index": 4 },
                                    { "type": "object", "from": "query", "index": 5 }, { "type": "object", "from": "response", "index": 6 },
                                    { "type": "object", "from": "request", "index": 7 }, { "type": "object", "from": "security_context", "index": 8 }]
                            },
                            "create": {
                                "verb": "POST", "route": "/api/player", "propertyKey": "create",
                                "params": [{ "type": "object", "from": "files", "index": 0, "name": "files" }, {
                                        "type": "object", "from": "cookies", "index": 1,
                                        "name": "cookies"
                                    }, { "type": "string", "from": "body", "index": 2, "name": "name" }]
                            }, "read": { "verb": "GET", "route": "/api/player/:player_id", "propertyKey": "read", "params": [{ "type": "number", "from": "params", "index": 0, "name": "player_id" }] }, "getByField": { "verb": "GET", "route": "/api/player/:field/:value", "propertyKey": "getByField", "params": [{ "type": "object", "from": "params", "index": 0, "name": "field" }, { "type": "number", "from": "params", "index": 1, "name": "value" }] }, "update": { "verb": "PUT", "route": "/api/player", "propertyKey": "update", "params": [] }, "delete": { "verb": "DELETE", "route": "/api/player", "propertyKey": "delete", "params": [] }
                        }, "_mocks": {}, "name": "TestController"
                    }, "name": "TestController"
                }], "remoteRoutes": [{ "info": {}, "active": true, "methodus": { "_events": {}, "_descriptors": { "list": { "verb": "GET", "route": "/api/player", "propertyKey": "list", "params": [{ "type": "string", "from": "headers", "index": 0, "name": "auth" }, { "type": "string", "from": "query", "index": 1, "name": "order_by" }] }, "listdefaults": { "verb": "GET", "route": "/api/player/desfaults", "propertyKey": "listdefaults", "params": [{ "type": "object", "from": "params", "index": 0 }, { "type": "object", "from": "body", "index": 1 }, { "type": "object", "from": "headers", "index": 2 }, { "type": "object", "from": "files", "index": 3 }, { "type": "object", "from": "cookies", "index": 4 }, { "type": "object", "from": "query", "index": 5 }, { "type": "object", "from": "response", "index": 6 }, { "type": "object", "from": "request", "index": 7 }, { "type": "object", "from": "security_context", "index": 8 }] }, "create": { "verb": "POST", "route": "/api/player", "propertyKey": "create", "params": [{ "type": "object", "from": "files", "index": 0, "name": "files" }, { "type": "object", "from": "cookies", "index": 1, "name": "cookies" }, { "type": "string", "from": "body", "index": 2, "name": "name" }] }, "read": { "verb": "GET", "route": "/api/player/:player_id", "propertyKey": "read", "params": [{ "type": "number", "from": "params", "index": 0, "name": "player_id" }] }, "getByField": { "verb": "GET", "route": "/api/player/:field/:value", "propertyKey": "getByField", "params": [{ "type": "string", "from": "params", "index": 0, "name": "field" }, { "type": "number", "from": "params", "index": 1, "name": "value" }] }, "update": { "verb": "PUT", "route": "/api/player", "propertyKey": "update", "params": [] }, "delete": { "verb": "DELETE", "route": "/api/player", "propertyKey": "delete", "params": [] } }, "_mocks": {}, "name": "TestTarget" }, "configuration": { "transportType": {} }, "name": "TestTarget" }], "events": {}, "app": { "name": "@methodus/describe", "version": "4.0.0", "description": "", "main": "build/index.js", "scripts": { "build": "trash build && tsc && cd client && tsc", "prepublishOnly": "npm version patch -message \"[VER] automatic tag commit by npm. Reviewer: npm\"", "test": "nyc alsatian build/tests/*.spec.js && nyc report --reporter=clover --reporter=html", "contracts": "npm run contract-publish && npm run client-publish", "postpublish": "npm run tag && npm run contract-publish && npm run client-publish", "contract": "contracts-server ./build.json", "client": "contracts-client ./build.json", "contract-publish": "npm version patch && contracts-server ./build.json -p", "client-publish": "npm version patch && contracts-client ./build.json -p", "sonar": "sonar-scanner.bat -Dsonar.projectKey=nodulusteam_-methodus-describe -Dsonar.organization=nodulusteam-github -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=8c7c7f129d82d3fe77455df4bf7607c5dacbfdc2" }, "author": "", "license": "ISC", "devDependencies": { "@methodus/server": "latest", "@types/jquery": "^3.2.16", "@types/node": "^10.12.9", "trash-cli": "^1.4.0", "alsatian": "^2.4.0", "nyc": "^14.1.1", "tslint": "^5.10.0", "typescript": "^3.9.5" }, "peerDependencies": { "@methodus/server": "latest" }, "dependencies": { "@methodus/platform-web": "latest" } }, "base": "//localhost:8020"
        };
    }
}
exports.Mock = Mock;
//# sourceMappingURL=mock.js.map