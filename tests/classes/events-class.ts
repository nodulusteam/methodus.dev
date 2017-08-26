import {Log, logger ,LogClass, Event, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, MethodEvent } from '../../index';
const endPoint = 'http://127.0.0.1:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');


@LogClass(logger)
@MethodConfig('EventsClass', endPoint)
export class EventsClass {
    constructor() { }


    @Log()
    @Event('PreEvent', Verbs.Get, '/posts/event')
    @Event('FirstClassEvent', Verbs.Get, '/posts/event')
    public evenHandler(item) {
        console.log('in event handler', item);
        return item;

    }

    @Log()
    @Event('SecondClassEvent', Verbs.Get, '/posts/event')
    public evenHandler1(item) {
        console.log('in event handler', item);
        return item;

    }




}