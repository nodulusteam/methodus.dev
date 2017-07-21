# Methodulus


<img src="./examples/resources/methodulus.svg" alt="Drawing" style="width: 200px;"/>


![logo](https://travis-ci.org/nodulusteam/methodulus.svg?branch=master "travis.ci " )

### motivation
i wanted to create a dynamic procedure flow, with each segment with it's own setup.

`npm i -S methodulus`


#### Hello methodulus
```
import { Player } from './player';
import { Server, MethodType, MethodulusConfig } from '../index';


MethodulusConfig.config['Player'] = MethodType.Local;
MethodulusConfig.servers = ['rest'];
const server = new Server(process.env.PORT || 8020);
server.useClass(Player);

```

#### the Player class
```
@MethodConfig('Player')
export class Player {
    @Method(Verbs.Post, '/api/player')
    public async create() {
        let p = new PlayerModel('1', 'player 1');
        await DB.Player.insert(p);
        return new MethodResult(p)
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

```

```
import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query } from 'methodulus';
const endPoint = 'http://localhost:8080';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
@MethodConfig('TestClass', endPoint)
export class TestClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        // console.log('action1 was called');
        console.log({ id: id, name: name });
        return { id: id, name: name };
    }


    @Method(Verbs.Post, '/posts/')
    public action2( @Body() item) {
        console.log(item);
        return item;

    }


    @Method(Verbs.Delete, 'api/acion1')
    public action3() {
        console.log('action3');
    }
}

```