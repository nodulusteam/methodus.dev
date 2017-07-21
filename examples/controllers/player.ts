import { Body, Method, MethodConfig, MethodType, Param, Query, Verbs, MethodError, MethodResult } from '../../index';
import { PlayerModel } from '../models/player';

@MethodConfig('Player')
export class Player {

    @Method(Verbs.Get, '/api/player')
    public async list() {
        let result = await PlayerModel.getAll();//<PlayerModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result)
    }




    @Method(Verbs.Post, '/api/player')
    public async create() {
        let p = new PlayerModel('1', 'player 1');
        await PlayerModel.create(p);
        //await DB.Player.insert(p);
        return new MethodResult(p)
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public async read( @Param('player_id') playerId: number) {
        let result = await PlayerModel.getById(playerId);//<PlayerModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result);
    }


    @Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField( @Param('field') field, @Param('value') value: number) {
        let result = await PlayerModel.getByField(field, value);       
        return new MethodResult(result);
    }

    @Method(Verbs.Put, '/api/player')
    public async update() {

    }


    @Method(Verbs.Delete, '/api/player')
    public delete() {

    }



}