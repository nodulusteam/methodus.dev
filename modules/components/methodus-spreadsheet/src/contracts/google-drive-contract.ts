import {  AuthType, MethodResult, Mapping } from '@methodus/framework-commons';
import decorators from '@methodus/framework-decorators';
import { Verbs } from '@methodus/platform-rest';
import { JWT } from 'google-auth-library';
import { Dictionary } from '../functions';
import { SheetPermissionsResponse } from '../interfaces';
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
@decorators.MethodConfig('GoogleDriveContract')
export class GoogleDriveContract {
    auth_mode: any;
    @decorators.Method(Verbs.Get, '/about')
    async getDriveInfo(@Mapping.Query('fields') fields: string = '*'): Promise<MethodResult> {
        return { fields } as any;
    }


    @decorators.Method(Verbs.Post, '/files/:ss_key/permissions')
    async addPermissions(@Mapping.Param('ss_key') _ss_key: string, @Mapping.Body() _options: Dictionary): Promise<MethodResult<SheetPermissionsResponse>> {
        return {} as any;
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