import { Log, LogLevel, logger, LogClass, MessageConfig, MessageWorker, MessageHandler, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, MethodEvent } from '../../index';
const endPoint = 'http://127.0.0.1:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('tmla:methodus');


@LogClass(logger)
@MessageConfig('EventsClass', 'singular')
export class EventsClass {
    constructor() { }
    @Log()
    @MessageWorker('update::FirstClassEvent', 'direct-bus')
    public evenHandler(item) {
        console.log('in event handler', item);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 5000);
        })
    }

    // @Log()
    // @MessageHandler('update::FirstClassEvent', 'event-bus')
    // public evenHandler1(item) {
    //     console.log('in event handler', item);
    //     return item;

    // }




}