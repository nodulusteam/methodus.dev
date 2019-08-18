# ![logo](_media/methodus_32.png) Methodus
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=vulnerabilities "coverage")


## Introduction
Methodus is a framework for building efficient, developer friendly, scalable Node.js server/server/client applications. It uses Typescript Decorators to annotate and define the application, allowing developers to focus on the actual functionality the application features. Its "Build now, Decide later" design patterns and architecture is what makes Methodus so versatile and powerfull.

Transports are actually the decisions that bind our code to a specific framework or architecture. These decisions will not easily change unless we abstract the effects of the choices we make somehow. 

## Evolving applications
A classic life-cycle for an application today would start with a small monolith which grows and then replaced with a microservices based distributed application and eventually becomes a cloud based complexed application. Such changes 


## Sweet Syntetic Sugar
Methodus decorators converts any method into an RPC(Remote Procedure Call). Optionaly invokable using a configured transport.


Using transport abstractions, Methodus application code can connect to any NodeJS framework, with builtin support for the HTTP/HTTP2 protocols and builtin routers for express/fastify. 






## Philosophy
We love developing applications, but the process requires the we predecide allot before we actually begin.
* What framework to use?
* How will it be deployed?
* What is the testing strategy?

Once these decisions are made, they are rarely changed. And since changes cost money, they are never made.
So, by abstracting the framework code from our logic code, we get a generic application, that can run on virtually any protocol/framework.

## Method - The basic unit

## The source
Every developer has to make alot of decisions while developing an application, the architects probably will make some more

The root functionality of methodus is the ability to control the program flow by injecting logic to the gap between a caller and a callee of a function.
This ability is very useful when developing distributed / dynamic applications,  allowing developers to use an agile, contained approach in their code logic.





>#### From the dungeon master,
> My fellow adventures developer, I welcome you into Methodus. 
You did not arrive here by mistake, nor was it an accident, it is your fate.
Like all adventures yours will begin with a simple implementation and evolve and gain complexity, by then  
Methodus will guide you through the evolution of your application as it grows and gains complexity.

But first you should ask yourself this:
1. Do you wish to build a NodeJS based monolithic server?

    *Monolits are easy to develop and reason about.*

2. Would you like to be able to break this monolith into micro-services as you scale it out?

    *Micro-services are much more performant but complexity rises too.*

3. How about an automatic testing plugin, allowing you to autodocument your apis and test them?

    *Annotated API's are easy to integrate and discover*

4. Would you like to concentrate on your logic code only, without the need to wire it to a specific framework?

    *Code first, wire later, almost too good to be through*

7. Are you going to consume this service using another application or a frontend application?

    *With methodus / methodus-client services can be consumed using code contracts*


<small> Logo by: Designer: Alpár-Etele Méder (https://www.iconfinder.com/pocike)</small>
<small>License: Creative Commons (Attribution 3.0 Unported) (http://creativecommons.org/licenses/by/3.0/)</small>


> [!NOTE]
> Code first, wire later.
 