import { Body, Method, MethodConfig, MethodType, Param, Query, Verbs, MethoError, MethoResult } from '../index';
import { Database } from '../tests/database/';
const DB = new Database();


export class PlayerModel {
    Id: string;
    Name: string;
    Age: string;
    Gender: string;
    constructor(id, name, age?, gender?) {

        this.Id = id;
        this.Name = name;
        this.Age = age;
        this.Gender = gender;
    }

}

@MethodConfig('Player')
export class Player {




    @Method(Verbs.Post, '/api/player')
    public async create() {
        let p = new PlayerModel('1', 'player 1');
        await DB.Player.insert(p);
        return new MethoResult(p)
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public async read( @Param('player_id') playerId: number) {
        return await DB.Player.find({ 'Id': playerId });
    }

    @Method(Verbs.Put, '/api/player')
    public async update() {

    }


    @Method(Verbs.Delete, '/api/player')
    public delete() {

    }



}