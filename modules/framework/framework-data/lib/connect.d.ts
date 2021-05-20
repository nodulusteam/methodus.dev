import * as mongo from "mongodb";
export declare class DBHandler {
    static connections: Map<string, mongo.Db>;
    static keyMode: string;
    private static connectionsPromises;
    private static connectionPools;
    static config: any;
    static getConnection(connectionName?: string): Promise<mongo.Db>;
    static initConnection(config: any, connectionName?: string): Promise<unknown>;
    closeConnection(): void;
    private static getDbOptions;
}
