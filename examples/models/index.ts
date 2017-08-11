


var //Datastore = require('nedb')
    //, 

    Datastore = require('nedb-promise');

export class Database {

    PlayerModel: any;
    SchoolModel: any;
    RoomModel: any;
    constructor() {
        this.PlayerModel = Datastore({ filename: './examples/data/players.db', autoload: true });
        this.RoomModel = Datastore({ filename: './examples/data/rooms.db', autoload: true });
        this.SchoolModel = Datastore({ filename: './examples/data/schools.db', autoload: true });

        // // let playersDataSource = require('../data/players.json');
        // // this.Player.insert(playersDataSource);

        // //datastore.fromInstance(new Datastore('../data/players.json', autoload:true));
        // this.PlayerModel = this.Player;
    }


}
