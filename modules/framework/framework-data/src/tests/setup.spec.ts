const path = require("path");
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above
const localServer = "mongodb://localhost:27017";
const config: any = {
  db: {
    mongo: {
      server: localServer,
      db: "test",
    },
  },
};

import { DBHandler } from "../connect";
DBHandler.config = {
  connections: {
    default: {
      server: localServer,
      db: "test",
      poolSize: 10,
      ssl: false,
      exchanges: ["event-bus", "cache-bus"],
      readPreference: "primaryPreferred",
    },
  },
};

import * as mongo from "mongodb";

const collectionsNames = ["Alert", "Case", "Company", "User"];
let connection: any = null;
let mongoUri;

export async function getConnection(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    mongo.MongoClient.connect(
      mongoUri,
      { poolSize: 10, useUnifiedTopology: true },
      function (err: any, client: any) {
        if (err) {
          return reject(err);
        }
        resolve(client.db(config.db.mongo.db));
      }
    );
  });
}

function init() {
  afterEach(async () => {
    await truncateCollections();
  });

  before(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      mongoUri = localServer;//await mongoServer.getUri();
      const connection: any = await getConnection();
      DBHandler.config = {
        connections: {
          default: {
            server: mongoUri,
            db: "test",
            poolSize: 10,
            ssl: false,
            exchanges: ["event-bus", "cache-bus"],
            readPreference: "primaryPreferred",
          },
        },
      };
      await Promise.all(
        collectionsNames.map((x) => {
          try {
            connection.createCollection(x);
          } catch (error) {
            console.log(error);
          }
        })
      );
      console.log(
        `The following collections created: ${collectionsNames.join(",")}`
      );
    } catch (err) {
      console.log(`Database failure: ${err}`);
    }
  });

  after(async () => {
    await mongoServer.stop();
  });
}

init();

export async function truncateCollections() {
  console.log("Removing all collections from db");
  connection = await getConnection();
  const names = (await connection.listCollections({}).toArray()).map(
    (collection: any) => collection.name
  );
  if (names.length === 0) {
    console.log("No collections were found in db to remove");
    return;
  }
  try {
    await Promise.all(
      names.map((collectionName: any) =>
        connection.collection(collectionName).drop()
      )
    );
    console.log(`Removed all collections from db: ${names}`);
  } finally {
  }
}
