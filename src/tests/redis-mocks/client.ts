let callback: (err, msg) => {};
let globalcorr: string;

export class Client {
    public subscribe(corr) {
        globalcorr = corr;

    }
    public on(eventname: string, cb: (err, msg) => {}) {
        callback = cb;

    }
    public publish(channel, msg) {
        callback(globalcorr, msg);
    }
}
