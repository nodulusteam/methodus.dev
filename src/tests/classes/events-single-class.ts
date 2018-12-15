import { logger, LogClass, MessageConfig, MessageWorker } from '../../index';
@LogClass(logger)
@MessageConfig('EventsClass', 'singular')
export class EventsClass {
    @MessageWorker('update::FirstClassEvent', 'direct-bus')
    public evenHandler(item) {
        console.log('in event handler', item);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 5000);
        });
    }
}
