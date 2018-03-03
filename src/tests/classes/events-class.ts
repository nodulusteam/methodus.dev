import {Log, LogLevel, logger ,LogClass, Method,MessageConfig, MessageHandler, MessageWorker, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, MethodEvent } from '../../index';
const endPoint = 'http://127.0.0.1:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('tmla:methodus');


@LogClass(logger)
@MethodConfig('EventsClass')
export class EventsClass {
    constructor() { }


    @Log()
    @MessageHandler('PreEvent', 'event-bus')
    @MessageHandler('update::FirstClassEvent','event-bus')
    public evenHandler(item) {
        console.log('in event handler', item);
        return item;

    }

    @Log()
    @MessageHandler('SecondClassEvent', 'event-bus')
    public evenHandler1(item) {
        console.log('in event handler', item);
        return item;

    }




}