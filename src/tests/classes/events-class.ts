import { logger, LogClass, MessageHandler, MethodConfig } from '../../index';
@LogClass(logger)
@MethodConfig('EventsClass')
export class EventsClass {
    @MessageHandler('PreEvent', 'event-bus')
    @MessageHandler('update::FirstClassEvent', 'event-bus')
    public evenHandler(item) {
        console.log('in event handler', item);
        return item;
    }

    @MessageHandler('SecondClassEvent', 'event-bus')
    public evenHandler1(item) {
        console.log('in event handler', item);
        return item;
    }
}
