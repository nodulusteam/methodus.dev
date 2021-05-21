# ![logo](docs/_media/methodus_32.png) Methodus

## Introduction
Methodus is a framework for building efficient, developer friendly, scalable Node.js server/server/client applications. It uses Typescript Decorators to annotate and define the application, allowing developers to focus on the actual functionality the application needs. Its "Build now, Decide later" design patterns and architecture is what makes Methodus so versatile and powerfull.

Using transport abstractions, Methodus application code can connect to any NodeJS framework, with builtin support for the HTTP/HTTP2 protocols and builtin routers for express/fastify. 


## Philosophy
We love developing applications, but the process requires the we predecide allot before we actually begin.
* What framework to use?
* How will it be deployed?
* What is the testing strategy?

Once these decisions are made, they are rarely changed. And since changes cost money, they are never made.
So, by abstracting the framework code from our logic code, we get a generic application, that can run on virtually any protocol/framework.



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


    

> [/Server](https://methodus.dev)

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
 

![@methodus/server](https://img.shields.io/npm/v/@methodus/server?color=%233399ff&label=%40methodus%2Fserver&style=flat-square)
![@methodus/platform-web](https://img.shields.io/npm/v/@methodus/platform-web?color=%23004d99&label=%40methodus%2Fclient&style=flat-square)
![@methodus/contracts](https://img.shields.io/npm/v/@methodus/contracts?color=%238080ff&label=%40methodus%2Fcontracts&style=flat-square)
![@methodus/framework-data](https://img.shields.io/npm/v/@methodus/framework-data?color=%23994d00&label=%40methodus%2Fdata&style=flat-square)
![@methodus/describe](https://img.shields.io/npm/v/@methodus/describe?color=%2353c653&label=%40methodus%2Fdescribe&style=flat-square)



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnodulusteam%2Fmethodus.dev.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnodulusteam%2Fmethodus.dev?ref=badge_large)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnodulusteam%2Fmethodus.dev.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnodulusteam%2Fmethodus.dev?ref=badge_shield)
