# Methodus
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=vulnerabilities "coverage")


## What for?
The root functionality of methodus is the ability to control the program flow by injecting logic to the gap between a caller and a callee of a function.
This ability is very useful when developing distributed / dynamic applications,  allowing developers to use an agile, contained approach in their code logic.


### Install server components
`npm i @methodus/server`



[Examples](./examples/index.md)









>#### From the dungeon master,
My fellow adventures developer, I welcome you into Methodus. 
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


***
#### The basics, an Express application using Methodus.
[Simple Express Server](examples/packed/simple-express-server/readme.md)
> The examples are incremental so besure to go through them all - or just to the finish line
***
####  What goes up must come down, so inbound must have some outbound.
[Using methodus for outbound calls](examples/packed/consuming-rest-services/readme.md)
> Consuming Rest services using annotated classes is pure restful joy.
***
#### Using contracts in a client application
[Frontend backed with an API](examples/packed/frontend-apis/readme.md)
> Contracts are a great way to bind server apis to client code. by using jevasript on both server & client, this can be a real advantage to an application stabillity and development cycles.



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

Use this constract to kick-start your very own methodus application
 
       
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




Look at the awesome logo I made at: <a href='https://onlinelogomaker.com' title='Online Logo Maker'>onlinelogomaker.com</a>