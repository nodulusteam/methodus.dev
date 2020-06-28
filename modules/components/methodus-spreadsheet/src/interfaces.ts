import { SpreadsheetWorksheet } from "./SpreadsheetWorksheet";
import { Dictionary } from "./functions";

export class SheetInfo {
    constructor(data: SheetInfo) {
        this.id = data.id;
        this.title = data.title;
        this.worksheets = data.worksheets;

    }
    public id: string;
    public title: string;
    public worksheets: SpreadsheetWorksheet[];
}


export class PagingInfo {
    total: number = 0;
}

export interface Credentials {
    client_email: string;
    private_key: string;
}


export interface SheetCreateResponse {
    spreadsheetId: string;
    properties: Dictionary
}


export interface SheetPermissionsResponse {
    role: string;
    type: string;
}

export type WebResponse = { result: any, body: any };
export type ResponsePromise = Promise<WebResponse | undefined | boolean>;
