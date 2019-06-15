# ![logo](docs/_media/methodus_32.png) Methodus
![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=sqale_rating "rating")
![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=reliability_rating "reliability")
![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=coverage "coverage")
![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-server&metric=vulnerabilities "coverage")


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
 
 