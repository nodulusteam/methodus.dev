# Methodulus

<a href="https://travis-ci.org/nodulusteam/methodulus">
<img src="./examples/resources/methodulus.png" alt="Drawing" style="max-width: 200px!important;"/>
</a>

[<img src="https://travis-ci.org/nodulusteam/methodulus.svg?branch=master">](https://travis-ci.org/nodulusteam/methodulus)
 

### motivation
* we want microservices!
* we need a dynamic system architecture!
* we want it all!


### automatic server to server connectivity using a dynamic rpc transport layer



`npm i -S methodulus`


<img src="./examples/resources/slide1.png">


#### Hello methodulus

> This example creats a rest (express based) server using a controller class `Player`
>
> it is configured to run the class code locally via an http server.
 

```javascript
import { Player } from './controllers/player';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodulusConfig, MethodulusClassConfig, MethodType, ServerType } from 'methodulus';

@ServerConfig(ServerType.Express, { port: process.env.PORT || 8020 })
@ClientConfig(Player, MethodType.Local)
class SetupServer extends ConfiguredServer {

}

new SetupServer();

```

#### the Player class
```javascript
import { Body, Method, MethodConfig, MethodType, Param, Query, Verbs, MethodError, MethodResult } from 'methodulus';
import { PlayerModel } from '../models/player';


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
 




# Classes & API

## ConfiguredServer

this class is the base class for the server implementation. it uses the Server & Client decorators to apply the desired configuration.

### @Server(ServerType, options)
syntetic suger for MethodulusConfig.run() function.


### @Client(ClassType, MethodType, resolver?)
syntetic suger for MethodulusConfig.use() function.



## MethodulusConfig
> configuration must complete before the server starts.
> configure each controller class to its desired state

```javascript
let config = new MethodulusConfig()
```

### .run(ServerType, options)
the run method determines what kind of server to run on the listening part of the application. to listen to REST request you should run `ServerType.Expess` and to listen to redis channel use `ServerType.Redis`  .


#### ServerType
* `Express`
* `Redis`
* `MQ`
* `Socket`


### .use(classType, MethodType, resolver)
the use method registers the way a class should be activated.
the first parameter is a class decorated with methodulus decoratos.


#### MethodType
> avaliable options are  `Local | Http | MQ | Socket | Redis`
* `Local`
run the code in the class, no proxy or transport required.

* `Http`
run the code using an http request to a microservice.

* `MQ`
use amqp rpc to execute the class code

* `Socket`
directly connect to a server using websocket connection.

* `Redis`
use redis rpc to execute the class code

#### Resolver
in order to access the correct service methodulus uses a resolver, which may be a literal containing the service uri or a promise returning the same.

resolvers are attached to a class, allowing the application to use different resolvers for different services.
```

```



### Available servers
an instamce of methodulus can run multiple listeners in different channels. the current list is:
* `express`
* `socketio`
* `amqp`
* `redis`


> here is a simple local configuration:
> The class `Player` will execute locally.
```
let servers = ['express']; 
let config = new MethodulusConfig(servers);
let resolver = 'http://127.0.0.1:8090';
config.run(ServerType.express, {port: process.env.PORT })
config.use(TestClass, MethodType.Local,resolver);

```



## Server
> creates an agnostic configured server.
```
const server = new Server(process.env.PORT);
```

Server methods are chainable and should e called in this order
```
const server = await new Server(process.env.PORT).configure(config).start();
```
# Decorators
## Class decorators
### @MethodConfig
decorating a class with the decorator will turn it into a methodulus end point.
```javascript
@MethodulusConfig(applicationname, [middlewares]?)
```

### @Method
Each decorated method in the MethodConfig decorated class will become a function endpoint of the methodulus application.

```
@Method(Verb, route, [middlewares])
```
## Parameter decorators
### @Query
### @Param
### @Body
### @Request
### @Response

