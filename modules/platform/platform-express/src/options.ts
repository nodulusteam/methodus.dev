
export interface ExpressOptions {
    port: string | number,
    secured?: boolean,
    key?: Buffer,
    cert?: Buffer,
    passphrase?: string,
    onStart?: Function[],
    fileUpload?: boolean,
    fileMaxSize?: number,
    cors?: boolean,
}