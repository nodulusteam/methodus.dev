import * as path from 'path';
import { Mock } from './mock';
import injection from '@methodus/server/injection';
import decorators from '@methodus/server/decorators';
import { MethodResult, Mapping } from '@methodus/server/commons';
import { Verbs } from '@methodus/platform-express';

function getBridge(): any {
    return (global as any).METHODUS_BRIDGE;
}
@decorators.MethodConfig('DescribeView')
export class DescribeView {
    public maybeMethodus(object: any): any {
        const proto = object.prototype || object.__proto__;
        const keyName = proto.constructor.name;
        if (proto && proto.constructor && proto.constructor.methodus) {
            return proto.constructor.methodus[keyName];
        }

        if (!proto && object.__proto__ && object.__proto__.methodus) {
            return object.__proto__.methodus[keyName];
        }

        if (object.methodus) {
            return object.methodus[keyName];
        }
        return proto.methodus[keyName];
    }

    private loadPJ() {
        let mainpj;

        try {
            mainpj = require(path.join(process.cwd(), 'package.json'));
        } catch (error) {
            //console.error(error);
            try {
                mainpj = require(path.join(__dirname, '..', '..', '..', '..', 'package.json'));
            } catch (ex) {
                mainpj = { version: 'NA' };
            }
        }
        return mainpj;
    }
    @decorators.Method(Verbs.Get, '/describe/methodus')
    public async getMethodusData(): Promise<MethodResult> {
        const data = getBridge();
        const routes: any = [];
        Object.keys(data.classes).forEach((cls) => {
            const methodus = this.maybeMethodus(data.classes[cls].classType);
            const pj = this.loadPJ();
            routes.push({ name: cls, methodus, info: pj });
        });

        return new MethodResult(routes);
    }

    @decorators.Method(Verbs.Get, '/describe/methodus/:className')
    public async getMethodusDataClass(@Mapping.Param('className') className: string): Promise<MethodResult> {
        const data = getBridge();
        const routes: any = [];
        const methodus = this.maybeMethodus(data.classes[className].classType);
        const pj = this.loadPJ();
        routes.push({ name: className, methodus, info: pj });
        return new MethodResult(routes);
    }

    @decorators.Method(Verbs.Get, '/describeproxy/:path')
    public async describeproxy(
        @Mapping.Query('u') applicationEndpoint: string,
        @Mapping.Param('path') applicationName: string
    ): Promise<MethodResult> {
        return new MethodResult({});
    }

    @decorators.MethodMock(Mock.dashbaord)
    @decorators.Method(Verbs.Get, '/describe/dashboard')
    public async dashboard(): Promise<MethodResult> {
        // const str = fs.readFileSync(path.join(clientDir, 'tabs/dashboard_tabs.ejs'), 'utf-8');
        // const template = ejs.compile(str, { filename: path.join(clientDir, 'tabs/dashboard_tabs.ejs') });
        const data = getBridge();
        const mainpj = this.loadPJ();
        const routes: any = [];
        const ignoreInClasse = ['DescribeView', 'ConfigView'];

        Object.keys(data.classes)
            .filter((cls) => ignoreInClasse.indexOf(cls) === -1)
            .forEach((cls) => {
                const methodus = this.maybeMethodus(data.classes[cls].classType);
                const pj = { version: getVersionFromPackageFile(methodus.name) };
                routes.push({ info: pj, active: true, methodus, name: cls });
            });

        const remoteRoutes: any = [];
        Object.keys(data.clients).forEach((cls) => {
            const methodus = this.maybeMethodus(data.clients[cls].classType);
            const pj = { version: getVersionFromPackageFile(methodus.name) };
            remoteRoutes.push({ info: pj, active: true, methodus, name: cls });
        });

        const result = Object.assign(
            {},
            {
                routes,
                remoteRoutes,
            },
            { app: { version: mainpj.version, name: mainpj.name } }
        );

        return new MethodResult(result);
    }

    @decorators.MethodMock(Mock.action)
    @decorators.Method(Verbs.Get, '/describe/test/:className/:actionKey')
    public async action(
        @Mapping.Param('className') className: string,
        @Mapping.Param('actionKey') actionKey: string
    ): Promise<MethodResult> {
        const data = getBridge();
        let testedClass: any = null;
        let isRemote = false;
        if (data.classes[className]) {
            testedClass = data.classes[className];
        } else {
            isRemote = true;
            testedClass = data.clients[className];
        }

        const methodus: any = this.maybeMethodus(testedClass.classType);
        const result = Object.assign(
            {},
            methodus._descriptors[actionKey],
            {
                cls: testedClass.classType,
                actionKey,
            },
            { isRemote }
        );

        if (methodus.prefix) {
            result.route = methodus.prefix + result.route;
        }
        return new MethodResult(result);
    }

    @decorators.MethodMock(Mock.action)
    @decorators.Method(Verbs.Post, '/describe/remote-test')
    public async remoteTest(@Mapping.Body('methodInfo') methodInfo: any): Promise<MethodResult> {
        const className = methodInfo.controllerName;
        let testedClass = injection.Injector.resolve(className);
        const remoteResult = await testedClass[methodInfo.propertyKey].apply(
            testedClass,
            methodInfo.params.map((param: any) => {
                return param.value;
            })
        );
        return remoteResult;
    }
}

function getVersionFromPackageFile(name) {
    try {
        const pj = require(path.join(process.cwd(), 'package.json'));
        return pj.version;
    } catch (error) {
        debugger;
        console.error(error);
    }
}
