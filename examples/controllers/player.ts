import { Methodus, MethodResult } from '../../index';
import { PlayerModel } from '../models/player';

@Methodus.MethodConfig('Player')

export class Player {
    @Methodus.MethodMock(new Player())
    @Methodus.Method(Methodus.Verbs.Get, '/api/player')

    public async list() {
        let result = await PlayerModel.getAll();//<PlayerModel>.getById() DB.Player.find({ 'Id': playerId });
      
        return new MethodResult(result)
    }




    @Methodus.Method(Methodus.Verbs.Post, '/api/player')

    public async create() {
        let p = new PlayerModel('1', 'player 1');
        await PlayerModel.create(p);
        //await DB.Player.insert(p);
        return new MethodResult(p)
    }

    @Methodus.Method(Methodus.Verbs.Get, '/api/player/:player_id')
    public async read( @Methodus.Param('player_id') playerId: number) {
        let result = await PlayerModel.getById(playerId);//<PlayerModel>.getById() DB.Player.find({ 'Id': playerId });
      
        return new MethodResult(result, 100);
    }


    @Methodus.Method(Methodus.Verbs.Get, '/api/player/:field/:value')

    public async getByField( @Methodus.Param('field') field, @Methodus.Param('value') value: number) {
        let result = await PlayerModel.getByField(field, value);
        return new MethodResult(result, 100);
    }

    @Methodus.Method(Methodus.Verbs.Put, '/api/player')

    public async update() {

    }


    @Methodus.Method(Methodus.Verbs.Delete, '/api/player')
    public delete() {

    }



}
