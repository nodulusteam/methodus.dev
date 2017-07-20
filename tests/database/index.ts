var Datastore = require('nedb')
    , db = new Datastore()
    , datastore = require('nedb-promise');

export class Database {
    Player: any;
    constructor() {

        this.Player = datastore.fromInstance(new Datastore());
    }


}
