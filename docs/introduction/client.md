## Philosophy

A Methodus server application will contain one or more frameworks agnostically bound to logic code.


```
@ServerConfiguration(BuiltInServers.Express, { port:  3060 })
@PluginConfiguration('@methodus/describe')
@ModuleConfiguration(MyLogicModule)
export class SetupServer extends ConfiguredServer {
  constructor() {
    super(SetupServer);     
  }
}
```







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