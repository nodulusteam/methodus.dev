import * as mongo from "mongodb";
import { Db, ReadPreference } from "mongodb";
import { logger } from "./logger";

export class DBHandler {
  static connections: Map<string, mongo.Db> = new Map<string, mongo.Db>();
  static keyMode: string = "_id";
  private static connectionsPromises: Map<string, Promise<mongo.Db>> = new Map<
    string,
    Promise<mongo.Db>
  >();
  private static connectionPools: any = {};
  static config: any;

  static async getConnection(
    connectionName: string = "default"
  ): Promise<mongo.Db> {
    if (!DBHandler.connectionPools) {
      DBHandler.connectionPools = {};
    }

    if (!DBHandler.connectionPools[connectionName]) {
      const factory = {
        create: (config) => {
          if (!DBHandler.connectionsPromises) {
            DBHandler.connectionsPromises = new Map<
              string,
              Promise<mongo.Db>
            >();
          }

          if (!DBHandler.connectionsPromises[connectionName]) {
            DBHandler.connectionsPromises[
              connectionName
            ] = DBHandler.initConnection(config, connectionName);
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
    const connection = await DBHandler.connectionPools[
      connectionName
    ].acquire();
    return connection;
  }

  static async initConnection(config, connectionName?: string) {
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
        const options: any = this.getDbOptions(
          config.connections[connectionName]
        );
        Object.assign(options, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        logger.info(this, `initiating DB connection to: ${dbAddress}`, options);
        mongo.MongoClient.connect(dbAddress, options, (err, client) => {
          if (err) {
            reject(err);
          } else {
            resolve(client.db(config.connections[connectionName].db));
          }
        });
      } else {
        throw new Error(`
                    Missing connections block or a default connection.
                    Please refer to https://wiki.web.att.com/pages/viewpage.action?pageId=621156341 for further explanation.
                    `);
      }
    });
  }

  closeConnection(): void {
    DBHandler.connections.forEach((connection: any, connectionName: string) => {
      connection.close();
      DBHandler.connections.delete(connectionName);
    });
  }

  private static getDbOptions(connection: any): {} {
    const dbOptions: {} = {};
    const defaultOptions = [
      { poolSize: 10 },
      { replicaSet: undefined },
      { ssl: false },
      { readPreference: ReadPreference.PRIMARY_PREFERRED },
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
