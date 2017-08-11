import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '../../index';
import { SchoolModel } from '../models/school';

@MethodConfig('School')
export class School {

    @Method(Verbs.Get, '/api/school')
    public async list() {
        let result = await SchoolModel.getAll();//<SchoolModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result)
    }




    @Method(Verbs.Post, '/api/school')
    public async create() {
        let p = new SchoolModel('1', 'school 1');
        await SchoolModel.create(p);
        //await DB.Player.insert(p);
        return new MethodResult(p)
    }

    @Method(Verbs.Get, '/api/school/:player_id')
    public async read( @Param('player_id') playerId: number) {
        let result = await SchoolModel.getById(playerId);//<SchoolModel>.getById() DB.Player.find({ 'Id': playerId }); 
        console.log(result);
        return new MethodResult(result, 100);
    }


    @Method(Verbs.Get, '/api/school/:field/:value')
    public async getByField( @Param('field') field, @Param('value') value: number) {
        let result = await SchoolModel.getByField(field, value);
        return new MethodResult(result, 100);
    }

    @Method(Verbs.Put, '/api/school')
    public async update() {

    }


    @Method(Verbs.Delete, '/api/school')
    public delete() {

    }



}