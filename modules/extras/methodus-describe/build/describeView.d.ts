import { MethodResult } from '@methodus/server/commons';
export declare class DescribeView {
    maybeMethodus(object: any): any;
    private loadPJ;
    getMethodusData(): Promise<MethodResult>;
    getMethodusDataClass(className: string): Promise<MethodResult>;
    describeproxy(applicationEndpoint: string, applicationName: string): Promise<MethodResult>;
    dashboard(): Promise<MethodResult>;
    action(className: string, actionKey: string): Promise<MethodResult>;
    remoteTest(methodInfo: any): Promise<MethodResult>;
}
