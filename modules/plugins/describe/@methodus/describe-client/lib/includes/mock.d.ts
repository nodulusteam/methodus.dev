export declare class Mock {
    static action(className: string, actionKey: string): {
        base: string;
        methodus: {
            _events: {};
            _descriptors: {
                get: {
                    verb: string;
                    route: string;
                    propertyKey: string;
                    params: {
                        type: string;
                        from: string;
                        index: number;
                        name: string;
                    }[];
                };
                list: {
                    verb: string;
                    route: string;
                    propertyKey: string;
                    params: {
                        type: string;
                        from: string;
                        index: number;
                        name: string;
                    }[];
                };
            };
            name: string;
        };
        actionKey: string;
    };
    static dashbaord(): {
        routes: ({
            info: {};
            active: boolean;
            methodus: {
                _events: {};
                _descriptors: {
                    get: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    list?: undefined;
                    listdefaults?: undefined;
                    create?: undefined;
                    read?: undefined;
                    getByField?: undefined;
                    update?: undefined;
                    delete?: undefined;
                };
                name: string;
                _mocks?: undefined;
            };
            name: string;
        } | {
            info: {};
            active: boolean;
            methodus: {
                _events: {};
                _descriptors: {
                    list: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    listdefaults: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                        }[];
                    };
                    create: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    read: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    getByField: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    update: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: any[];
                    };
                    delete: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: any[];
                    };
                    get?: undefined;
                };
                _mocks: {};
                name: string;
            };
            name: string;
        })[];
        remoteRoutes: {
            info: {};
            active: boolean;
            methodus: {
                _events: {};
                _descriptors: {
                    list: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    listdefaults: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                        }[];
                    };
                    create: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    read: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    getByField: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: {
                            type: string;
                            from: string;
                            index: number;
                            name: string;
                        }[];
                    };
                    update: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: any[];
                    };
                    delete: {
                        verb: string;
                        route: string;
                        propertyKey: string;
                        params: any[];
                    };
                };
                _mocks: {};
                name: string;
            };
            configuration: {
                transportType: {};
            };
            name: string;
        }[];
        events: {};
        app: {
            name: string;
            version: string;
            description: string;
            main: string;
            scripts: {
                build: string;
                prepublishOnly: string;
                test: string;
                contracts: string;
                postpublish: string;
                contract: string;
                client: string;
                "contract-publish": string;
                "client-publish": string;
                sonar: string;
            };
            author: string;
            license: string;
            devDependencies: {
                "@methodus/server": string;
                "@types/jquery": string;
                "@types/node": string;
                "trash-cli": string;
                alsatian: string;
                nyc: string;
                tslint: string;
                typescript: string;
            };
            peerDependencies: {
                "@methodus/server": string;
            };
            dependencies: {
                "@methodus/platform-web": string;
            };
        };
        base: string;
    };
}
