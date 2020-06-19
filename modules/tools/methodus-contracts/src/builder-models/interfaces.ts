export interface KeysConfiguration {
    [key: string]: Configuration;
}

export interface ModelConfiguration {
    path: string;
}

export interface IncludeConfiguration {
    path: string;
}

export interface DeclarationConfiguration {
    path: string;
}

export interface BindindConfiguration {
    server: string;
    path: string;
}

export interface Configuration {
    buildPath: string;
    buildFolder: string;
    srcFolder: string;
    packageName: string;
    contractNameServer: string;
    contractNameClient: string;
    npmrc: string;
    npmignore: string;
    models: Map<string, ModelConfiguration>;
    contracts: Map<string, ModelConfiguration>;
    includes: Map<string, IncludeConfiguration>;
    declarations: Map<string, DeclarationConfiguration>;
    bindings: Map<string, BindindConfiguration>;
    dependencies: Map<string, string>;
    protobuf: {
        buildPath: string;
    }
}

export const HEADER = `
// Methodus contract.
// Generated at: ${new Date()}
`;

export class BuildOptions {
    constructor(isClient, publish, isMocked?) {
        this.isClient = isClient;
        this.publish = publish;
        this.isMocked = isMocked;
    }
    isClient: boolean;
    publish: boolean;
    isMocked?: boolean;
    isProtobuf?: boolean;
}

