import { FirstClass } from './FirstClass';
import { SecondClass } from './SecondClass';
import { ThirdClass } from './ThirdClass';
import { logger, Event, MethodEvent, Method, MethodConfig, Verbs, ServerType, MethodError, MethodResult, MethodType } from '../../index'



@MethodConfig('Gateway')
export class Gateway {

    constructor() {

    }

    @Method(Verbs.Get, '/gateway/first')
    async callFirstClass() {

        console.log('Gateway.callFirstClass()')
        new MethodEvent('FirstClassEvent', 'roi');


        let first = new FirstClass();
        let result = await first.action1(1, 'roi from gateway');
        console.log('first.action1()', result);
        return new MethodResult(result);
    }


    @Event('FirstClassEvent', Verbs.Post, '/events/theeventhandler')
    async theEventHandler() {
        console.log('in event handler');
        // let second = new SecondClass();
        // return await second.action1(1, 'roi from gateway');
    }



    @Method(Verbs.Get, '/gateway/first')
    async callSecondClass() {
        let second = new SecondClass();
        return await second.action1(1, 'roi from gateway');
    }

    @Method(Verbs.Get, '/gateway/first')
    async callThirdClass() {
        let third = new ThirdClass();
        return await third.action1(1, 'roi from gateway');
    }


}