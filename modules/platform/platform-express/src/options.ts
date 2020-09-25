
export interface ExpressOptions {
    port: string | number;
    ipAddress?: string;
    secured?: boolean;
    key?: Buffer;
    cert?: Buffer;
    passphrase?: string;
    onStart?: Function[];
    fileUpload?: boolean;
    fileMaxSize?: number;
    cors?: boolean;
    session?: ExpressSessionOptions;
}


export interface ExpressSessionOptions {
    secret: string;
    cookie: { maxAge: 60000 }
}
    
     