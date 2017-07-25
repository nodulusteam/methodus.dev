import { Body, Method, MethodConfig, Param, Query, Verbs, MethodError, MethodResult } from '../../index';


@MethodConfig('JsonPlaceHolder')
export class JsonPlaceHolder {

    @Method(Verbs.Get, '/posts/player')
    public async list() {
        // let result = await PlayerModel.getAll();//<PlayerModel>.getById() DB.Player.find({ 'Id': playerId }); 
        // console.log(result);
        // return new MethodResult(result)
    }




    @Method(Verbs.Post, '/api/player')
    public async create() {

    }

    @Method(Verbs.Get, '/api/posts/:post_id')
    public async read( @Param('post_id') postId: number) {

    }


    @Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField( @Param('field') field, @Param('value') value: number) {

    }

    @Method(Verbs.Put, '/api/player')
    public async update() {

    }


    @Method(Verbs.Delete, '/api/player')
    public delete() {

    }



}