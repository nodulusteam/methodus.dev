var //Datastore = require('nedb')
    //, 

    Datastore = require('nedb-promise');

export class Database {
    Player: any;
    PlayerModel: any;
    constructor() {
        this.Player = Datastore({ filename: './examples/data/players.db', autoload: true });
        // let playersDataSource = require('../data/players.json');
        // this.Player.insert(playersDataSource);

        //datastore.fromInstance(new Datastore('../data/players.json', autoload:true));
        this.PlayerModel = this.Player;
    }


}
