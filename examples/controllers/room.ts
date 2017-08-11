import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '../../index';
import { RoomModel } from '../models/room';

@MethodConfig('Room')
export class Room {

    @Method(Verbs.Get, '/api/room')
    public async list() {
        let result = await RoomModel.getAll();//<RoomModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result)
    }




    @Method(Verbs.Post, '/api/room')
    public async create() {
        let p = new RoomModel('1', 'player 1');
        await RoomModel.create(p);
        //await DB.Player.insert(p);
        return new MethodResult(p)
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public async read( @Param('player_id') playerId: number) {
        let result = await RoomModel.getById(playerId);//<RoomModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result, 100);
    }


    @Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField( @Param('field') field, @Param('value') value: number) {
        let result = await RoomModel.getByField(field, value);
        return new MethodResult(result, 100);
    }

    @Method(Verbs.Put, '/api/player')
    public async update() {

    }


    @Method(Verbs.Delete, '/api/player')
    public delete() {

    }



}