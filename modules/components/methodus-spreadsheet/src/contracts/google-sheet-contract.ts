
import { Verbs } from '@methodus/platform-rest';
import { SheetInfo, WebResponse, SheetCreateResponse } from '../interfaces';
import { JWT } from 'google-auth-library';
import { Dictionary } from '../functions';
import { MethodResult,  Mapping, AuthType } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
//const GoogleAuth = require('google-auth-library');
 


@decorators.Auth(AuthType.BearerToken, async function (_options: Dictionary) {
    const caller: any = this;
    if (caller.auth_mode === 'jwt') {
        if (!caller.google_auth || caller.google_auth.expires < +new Date()) {
            await caller.renewJwtAuth();
        }
        if (caller.google_auth) {
            if (caller.google_auth.type === 'Bearer') {
                return 'Bearer ' + caller.google_auth.value;
            }
            else {
                return 'GoogleLogin auth=' + caller.google_auth;
            }
        }
    }
    return '';
})
@decorators.MethodConfig('GoogleSheetContract')
export class GoogleSheetContract {

    auth_mode: any;

    @decorators.Method(Verbs.Get, '/:ss_key/values/:range')
    async getRows(@Mapping.Param('ss_key') _ss_key: string, @Mapping.Param('range') _range: string, @Mapping.Query() _query: any) {

    }

    @decorators.Method(Verbs.Get, '/:ss_key/values/:range')
    async getHeaderRow(@Mapping.Param('ss_key') _ss_key: string, @Mapping.Param('range') _range: string): Promise<MethodResult<any>> {

        return new MethodResult<any>({});
    }



    @decorators.Method(Verbs.Post, '/:ss_key:batchUpdate')
    async batchUpdate(@Mapping.Param('ss_key') _ss_key: string, @Mapping.Body() _body: any): Promise<MethodResult<WebResponse>> {

        return new MethodResult<any>({});
    }


    @decorators.Method(Verbs.Get, '/:ss_key')
    async getInfo(@Mapping.Param('ss_key') _ss_key: string): Promise<MethodResult<SheetInfo>> {
        const sheetInfo: SheetInfo = new SheetInfo({ title: 'contract', worksheets: [], id: 'xxxxx' });
        return new MethodResult<SheetInfo>(sheetInfo);
    }


    @decorators.Method(Verbs.Post, '/')
    async createSheet(@Mapping.Body() _options: any): Promise<MethodResult<SheetCreateResponse>> {
        return new MethodResult<SheetCreateResponse>({} as any);
    }

    setAuthToken(auth_id: any) {
        if (this.auth_mode == 'anonymous') this.auth_mode = 'token';
        this.setAuthAndDependencies(auth_id);
    }

    setAuthAndDependencies(auth: any) {
        this.google_auth = auth;
        // if (!this.options.visibility) {
        //     this.visibility = this.google_auth ? 'private' : 'public';
        // }
        // if (!this.options.projection) {
        //     this.projection = this.google_auth ? 'full' : 'values';
        // }
    }
    google_auth: any;
    visibility?: string;
    jwt_client: any;
    async renewJwtAuth() {
        this.auth_mode = 'jwt';
        const credentials = await (this.jwt_client as JWT).authorize();
        this.setAuthToken({
            type: credentials.token_type,
            value: credentials.access_token,
            expires: credentials.expiry_date
        });
    }


}