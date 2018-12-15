import { FirstClass } from './FirstClass';
import { SecondClass } from './SecondClass';
import { ThirdClass } from './ThirdClass';
import { MessageHandler, MethodEvent, Method, MethodConfig, Verbs, MethodResult } from '../../index';

@MethodConfig('Gateway')
export class Gateway {
    @Method(Verbs.Get, '/gateway/first')
    async callFirstClass() {
        MethodEvent.emit('FirstClassEvent', 'roi');
        const first = new FirstClass();
        const result = await first.action1(1, 'roi from gateway');
        return new MethodResult(result.result);
    }

    @MessageHandler('FirstClassEvent', 'event-bus')
    async theEventHandler() {
        console.log('in event handler');
        // let second = new SecondClass();
        // return await second.action1(1, 'roi from gateway');
    }

    @Method(Verbs.Get, '/gateway/first')
    async callSecondClass() {
        const second = new SecondClass();
        const result = await second.action1(1, 'roi from gateway');
        return new MethodResult(result.result);
    }

    @Method(Verbs.Get, '/gateway/first')
    async callThirdClass() {
        const third = new ThirdClass();
        const result = await third.action1(1, 'roi from gateway');
        return new MethodResult(result.result);
    }

}
