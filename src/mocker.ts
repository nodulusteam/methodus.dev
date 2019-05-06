import { MethodusClientConfig } from './config/client-config';
import { TransportType } from './interfaces';

export class Mocker {
    public static mock(target: any) {
        // get the bridge

        const bridge = (global as any).METHODUS_BRIDGE;
        const configEntry = new MethodusClientConfig(target, TransportType.Mock);
        bridge.clients[target.name] = configEntry;
        return bridge;
    }
}
