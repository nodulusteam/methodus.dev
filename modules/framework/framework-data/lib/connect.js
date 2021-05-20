"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHandler = void 0;
const mongo = require("mongodb");
const mongodb_1 = require("mongodb");
const logger_1 = require("./logger");
class DBHandler {
    static async getConnection(connectionName = "default") {
        if (!DBHandler.connectionPools) {
            DBHandler.connectionPools = {};
        }
        if (!DBHandler.connectionPools[connectionName]) {
            const factory = {
                create: (config) => {
                    if (!DBHandler.connectionsPromises) {
                        DBHandler.connectionsPromises = new Map();
                    }
                    if (!DBHandler.connectionsPromises[connectionName]) {
                        DBHandler.connectionsPromises[connectionName] = DBHandler.initConnection(config, connectionName);
                    }
                },
                acquire: async () => {
                    return await DBHandler.connectionsPromises[connectionName];
                },
                destroy: (client) => {
                    client.disconnect();
                },
            };
            factory.create(this.config);
            DBHandler.connectionPools[connectionName] = factory;
        }
        const connection = await DBHandler.connectionPools[connectionName].acquire();
        return connection;
    }
    static async initConnection(config, connectionName) {
        return new Promise((resolve, reject) => {
            let dbAddress = "";
            if (!connectionName) {
                connectionName = "default";
            }
            if (config.connections && config.connections[connectionName]) {
                dbAddress = `${config.connections[connectionName].server}`;
                if (config.connections[connectionName].db) {
                    dbAddress = `${dbAddress}/${config.connections[connectionName].db}`;
                }
                const options = this.getDbOptions(config.connections[connectionName]);
                Object.assign(options, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                logger_1.logger.info(this, `initiating DB connection to: ${dbAddress}`, options);
                mongo.MongoClient.connect(dbAddress, options, (err, client) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(client.db(config.connections[connectionName].db));
                    }
                });
            }
            else {
                throw new Error(`
                    Missing connections block or a default connection.
                    Please refer to https://wiki.web.att.com/pages/viewpage.action?pageId=621156341 for further explanation.
                    `);
            }
        });
    }
    closeConnection() {
        DBHandler.connections.forEach((connection, connectionName) => {
            connection.close();
            DBHandler.connections.delete(connectionName);
        });
    }
    static getDbOptions(connection) {
        const dbOptions = {};
        const defaultOptions = [
            { poolSize: 10 },
            { replicaSet: undefined },
            { ssl: false },
            { readPreference: mongodb_1.ReadPreference.PRIMARY_PREFERRED },
            { user: undefined },
            { password: undefined },
            { useUnifiedTopology: true },
        ];
        defaultOptions.forEach((option) => {
            const key = Object.keys(option)[0];
            if (connection[key] !== undefined) {
                dbOptions[key] = connection[key];
            }
            if (dbOptions[key] === undefined) {
                delete dbOptions[key];
            }
        });
        return dbOptions;
    }
}
exports.DBHandler = DBHandler;
DBHandler.connections = new Map();
DBHandler.keyMode = "_id";
DBHandler.connectionsPromises = new Map();
DBHandler.connectionPools = {};
//# sourceMappingURL=connect.js.map