import { Event, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, MethodEvent } from '../../index';
const endPoint = 'http://localhost:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
@MethodConfig('EventsClass', endPoint)
export class EventsClass {
    constructor() { }


    @Event('PreEvent', Verbs.Get, '/posts/event')
    @Event('FirstClassEvent', Verbs.Get, '/posts/event')
    public evenHandler(item) {
        console.log('in event handler', item);
        return item;

    }


    @Event('SecondClassEvent', Verbs.Get, '/posts/event')
    public evenHandler1(item) {
        console.log('in event handler', item);
        return item;

    }




}