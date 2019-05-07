# Methodus
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=vulnerabilities "coverage")





## Why shoud you engage methodus
The root functionality of methodus is the abbility to control the program flow by injecting logic to the gap between the caller and the callee of a function.
This ability is very usefull when developing distribued / dynamic applications,  allowing developers to use an agile, contained approach in our code.


### Install
`npm i @methodus/server`

### step 1 - create a controller : DataController
Methodus controllers are transport agnostic; parameters are passed via arguments to a function , which returns a value or raise an error, pretty straightforward but extermely powerful.

```Typescript
const items = {'item1': 'item 1 value','item2': 'item 2 value','item3': 'item 3 value', }
@MethodConfig('DataController')// anotate using the class Name - exact!
export class DataController {

    // 
    @Method(Verbs.Get, '/items/')
    public static async list(): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Get, '/items/:id')
    public static async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/id/')
    public static async create(@Body('item') item: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/id/:id')
    public static async update(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
    @Method(Verbs.Delete, '/id/:id')
    public static async remove(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult({});
    }
}
```

### step 1 - create a server
Create an "Express" server using the built in implementation
```Typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer,BuiltInServers, BuiltInTransports} from '@methodus/server';
import { DataController } from './controllers';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(DataController, BuiltInServers.Express) // attach the DataController class to the Express instance 
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}
(() => {
    return new Xserver();
})();
```

### Run
After running your server you should be able to browse to http://localhost:6695/




### Greetings,
my fellow adventures developer, I welcome you into Methodus. 
You did not arrive here by mistake, nor was it an accident, it is your fate.
Methodus will guide you through the evolution of your application as it grows and gains complexity.
But first you should ask yourself this:

1. Do you wish to build a nodejs based api monolithic server?
2. Would you like to be able to break this monolith into micro-services as you scale it out?
3. How about an automatic testing plugin, allowing you to autodocument your apis and test them?
4. Would you like to concentrate on your logic code only, without the need to wire it to a specific framework?
5. How about event sourcing would you like some of that?
6. Are you using typescript?
7. Do you need a frontend for this server?

If any of these sounds familiar please step in and carve your path,  

> [/Server](https://github.com/nodulusteam/-methodus-server)

The server components of methodus (nodejs). 
Use it to build a nodejs server application with support for various transports.

> [/Client](https://github.com/nodulusteam/-methodus-client)

Connect your server to any Javascript client using this client library

> [/Plugin](https://github.com/nodulusteam/-methodus-describe)

Debug and analyse your server application using this plugin

> [/Contracts](https://github.com/nodulusteam/-methodus-contracts)

Build binding packages to your server application

> [/Data](https://github.com/nodulusteam/-methodus-data)

Model API data objects and manage DB access (mongodb)

> [/Example](https://github.com/nodulusteam/-methodus-example)

Use this consract to kick-start your very own methodus application




**Methodus is a micro-service & RPC framework, so let's build a micro-service from scratch using this beautiful framework.**

### The controller
Methodus uses controllers in the same manner the `express` framework does. It binds functions or class methods to a route. and then routes the requests to these functions.
in Methodus it will look like this
 
```javascript
import { Method, MethodConfig, Files, Verbs, MethodType, Body, Response, Request, Param, Query, SecurityContext, MethodError, MethodResult } from '@methodus/server';

/*start custom*/
//in here you can put types and definitions that should be distributed with the contract
/*end custom*/

import * as fs from 'fs';
import * as path from 'path';



@MethodConfig('@ns/hellow-world')
export class Hello {

@Method(Verbs.Post, '/api/hello', [upload.any(), autoReap]) //loading route and middlewares
public static async upload( @Files('0') file: any, @Query('originalname') originalname: string, @Query('keep_original') keepOriginalName: boolean = true) {
return new MethodResult(result);//return the result
};


@Method(Verbs.Get, '/api/hello/:file_id')
public static async getById( @Param('file_id') file_id) {
return new MethodResult(result);

};

@Method(Verbs.Get, '/api/hello/name/:file_name/')
public static async getByName( @Param('file_name') file_name, @SecurityContext() securityContext) {
return new MethodResult(result);

};



@Method(Verbs.Delete, '/api/hello/id/:file_id')
public static async delete( @Param('file_id') file_id, @SecurityContext() securityContext) {
return new MethodResult(deleteResult);
};
}

 ```

       
The controller class is decorated with a @MethodConfig decorator stating the name of the npm package the controller refers to.
Each method is then decorated with a @Method decorator and the route parameters (Http verb, path, middlewares).
The arguments passed into these decorated methods will be mapped according to the argument variables that precede them.
 

 <table>
 <tr><td>Decorator</td><td>Verb</td><td>Description</td></tr>
  <tr><td>@Body()</td><td>Post</td>same as body in express, a name can be passed to get a specific key within the body object<td></td></tr>
   <tr><td>@Query()</td><td>All</td><td>All	same as query in express, a name can be passed to get a specific key within the query object</td></tr>
     <tr><td>@Param()</td>
     <td>All</td>
     <td>All	same as param in express, a name can be passed to get a specific key within the param object.</td></tr>
 <tr><td>@File()</td><td>Post</td><td>same as files in express + multer , a name can be passed to get a specific key within the body object	 </td></tr>
 
  
   
   <tr><td>Special Mappings</td><td></td><td></td></tr>
    <tr><td>@Response()</td><td>All</td><td>same as res in express, the mapping should be used when we need to pipe a stream to the response</td></tr>
     <tr><td>@Request()</td><td>All</td><td>	same as req in express, the mapping should be used when we need to pipe a stream to the request	</td></tr>    
 </table> 
 
	 
A Methodus method should return an object of type MethodResult. this object can be used to set the status code for the response as well as paging and total records information.

```javascript
@Method(Verbs.Get, '/api/hello/name/:file_name/')
public static async getByName( @Param('file_name') file_name, @SecurityContext() securityContext) {
    return new MethodResult(result);
};
```

Methodus methods are automatiaclly loged using the Trace log level.
you may have noticed the use of static methods for the controller class. this is not mandatory as you may use either static or instance approach,
as long as you do that for all the methods in the class.

### Server activation
The controller is ready, let's bind it to a methodus server.
in our node app we create an entry point in the form of host.ts file.
this host file starts an express server using the configured port and binds our controller to it.
 
 
```javascript
import { ServerType, Server, MethodType, MethodusConfig } from '@methodus/server';
import { Hello } from './controllers/hello-controller';

(async () => {
let config = new MethodusConfig();
config.run(ServerType.Express, { port: +process.env.PORT });
config.use(Hello, MethodType.Local, ServerType.Express);
let server = await new Server(+process.env.PORT).configure(config).start();
})()
```

the async function is an IIFE  ( Immidiatly Invoked Function Expression) that executes the server code, but you may use any invocation method you see fit.

if all goes well you should see
```
__ _ _|_|_ _ _| _ 
|||(/_ |_| |(_)(_||_|_> 
Starting REST server on port xxxx
``` 
 
which means that every thing wen well and you're ready to browser or postman your routes.
 
Your microservice ready, but if it is to be consumed using the Methodus rpc it need's to generate a contract.
