
export interface ExpressOptions {
    port: string | number,
    secured: boolean,
    key?: Buffer,
    cert?: Buffer,
    passphrase?: string,
}