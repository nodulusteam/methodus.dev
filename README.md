# Methodus

### Greetings,
my fellow adventures developer, I welcome you into Methodus. 
You did not arrive here by mistake, nor was it an accident, it is your fate.
Methodus will guide throght the evolution of your application as it grows and gains complexity.
But first you should ask your self this:

1. Do you wish to build a nodejs based api monolithic server?
2. Would you like to be able to break this monolith into micro-services as you scale it out?
3. How about an automatic testing plugin, allowing you to auto document your apis and test them?
4. Would you like to concentrate on your logic code only, without the need to wire it to a specific framework?
5. How about event sourcing would you like some of that?
6. Are you using typescript?
7. Do you need a frontend for this server?

Well,  







**Methodus is a micro-service & RPC framework, so let's build a micro-service from scratch using this beautiful framework.**

### The controller
Methodus uses controllers in the same manner the `express` framework does. It binds functions or class methods to a route. and then routes the requests to these functions.
in Methodus it will look like this
 
```javascript
import { Method, MethodConfig, Files, Verbs, MethodType, Body, Response, Request, Param, Query, SecurityContext, MethodError, MethodResult } from '@tmla/methodus';

/*start custom*/
//in here you can put types and definitions that should be distributed with the contract
/*end custom*/

import * as fs from 'fs';
import * as path from 'path';



@MethodConfig('@tmla-tiles/hellow-world')
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
public static async getByName( @Param('file_name') file_name, @SecurityContext() att) {
return new MethodResult(result);

};



@Method(Verbs.Delete, '/api/hello/id/:file_id')
public static async delete( @Param('file_id') file_id, @SecurityContext() att) {
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
  <tr><td>@SecurityContext()</td><td>All</td><td>same as using req.att in our traditional cntrollers.
  the security context is built using the @tmla/secure middleware, therefor in order to use it the middleware should be used.</td></tr>
   <tr><td>Special Mappings</td><td></td><td></td></tr>
    <tr><td>@Response()</td><td>All</td><td>same as res in express, the mapping should be used when we need to pipe a stream to the response</td></tr>
     <tr><td>@Request()</td><td>All</td><td>	same as req in express, the mapping should be used when we need to pipe a stream to the request	</td></tr>    
 </table> 
 
	 
A Methodus method should return an object of type MethodResult. this object can be used to set the status code for the response as well as paging and total records information.

```javascript
@Method(Verbs.Get, '/api/hello/name/:file_name/')
public static async getByName( @Param('file_name') file_name, @SecurityContext() att) {
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
import { ServerType, Server, MethodType, MethodusConfig } from '@tmla/methodus';
import { Hello } from './controllers/hello-controller';
const configuration = require('@tmla/config').config;
(async () => {
let config = new MethodusConfig();
config.run(ServerType.Express, { port: +configuration.port });
config.use(Hello, MethodType.Local, ServerType.Express);
let server = await new Server(+configuration.port).configure(config).start();
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
 