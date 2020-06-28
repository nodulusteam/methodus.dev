import uuidv1 from 'uuid/v1';
const log = require('debug')('methodus:spreadsheet');
import { GoogleSpreadsheet } from './GoogleSpreadsheet';
import { Credentials, SheetInfo, PagingInfo } from './interfaces';
import { SpreadsheetWorksheet } from './SpreadsheetWorksheet';
import { SpreadsheetRow } from './SpreadsheetRow';
import { Dictionary, prepareObject, parseObject } from './functions';

const SheetsCache: { [sheetId: string]: Sheet } = {};

export function getSheet(sheetId: string, creds: Credentials) {
    if (!SheetsCache[sheetId]) {
        log('sheetId', sheetId)
        SheetsCache[sheetId] = new Sheet(sheetId, creds);
    }
    return SheetsCache[sheetId];
}

export class SheetDataResult<Model = any> {
    constructor(data: Model[], ) {
        this.data = data;
    }
    public info?: PagingInfo;
    public data: Model[];
}

export class SortRequest {
    colId: string = '';
    direction: 'asc' | 'desc' = 'asc';
}

interface Key {
    keyid: string;
}

function keyid(data: unknown): string {
    return (data as Key).keyid;
}
function setKeyid(data: unknown, key: string): void {
    (data as Key).keyid = key;
}


export class Sheet {
    private sheets: Dictionary<SpreadsheetRow[]> = {};
    private credentials?: Credentials;
    public info?: SheetInfo;
    public doc: GoogleSpreadsheet;
    private intervals: Dictionary = {};
    private loaded: Dictionary<boolean> = {};

    constructor(sheetid: string, credentials?: Credentials) {
        this.credentials = credentials;
        this.doc = new GoogleSpreadsheet(sheetid);

    }


    private async handleHeader<Model>(dataObject: Partial<Model>, sheet: string): Promise<{ data: Partial<Model> | Partial<Model>[], fields: string[] }> {
        const finalObject: Partial<Model> = {};
        Object.keys(dataObject as Dictionary<any>).forEach((key: string) => {
            (finalObject as Dictionary)[key] = (dataObject as Dictionary)[key];
        });

        let existingFields: string[] = [];

        try {
            const headerRow = await this.doc.worksheets[sheet].getHeaderRow<Model>();
            existingFields = headerRow.data as any || [];
        } catch (error) {

        }

        Object.keys(finalObject).forEach((key) => {
            if (existingFields.indexOf(key) === -1) {
                existingFields.push(key);
            }
        });
        return {
            data: finalObject,
            fields: existingFields
        };
    }

    // private errorHandler(error: Error, reject: Function) {
    //     return reject(new Error(error.message));
    // }

    public async insert<Model>(sheet: string, dataObject: Partial<Model>): Promise<Partial<Model> | null> {
        // Authenticate with the Google Spreadsheets API.
        await this.doc.useServiceAccountAuth(this.credentials!);

        if (!this.info) {
            this.info = await this.doc.getInfo();

        }
        if (!this.doc.worksheets[sheet]) {
            try {

                const newSheet = await this.doc.addWorksheet({
                    title: `${sheet}`,
                });
                if (newSheet) {
                    this.doc.worksheets[sheet] = new SpreadsheetWorksheet(this.doc, newSheet.data);
                }

            } catch (error) {
                throw new Error('Cannot create sheet');
            }
        }


        const baseObject = await this.handleHeader<Model>(dataObject, sheet);


        if (baseObject.fields.indexOf('keyid') === -1) {
            baseObject.fields.push('keyid');
        }
        setKeyid(baseObject.data, uuidv1());
        baseObject.data = prepareObject(baseObject.data);

        const insertedRow = await this.doc.worksheets[sheet].addRow<Model>(baseObject.data as Partial<Model>, baseObject.fields);
        this.loaded[sheet] = false;
        this.sheets[sheet] = await this.doc.worksheets[sheet].getRows();
        this.loaded[sheet] = true;
        parseObject(insertedRow!.data);
        return insertedRow!== null ? insertedRow.data :  null;
    }

    public async insertMany<Model>(sheet: string, dataObject: Partial<Model>[]): Promise<Partial<Model>[]> {
        // Authenticate with the Google Spreadsheets API.
        await this.doc.useServiceAccountAuth(this.credentials!);

        if (!this.info) {
            this.info = await this.doc.getInfo();

        }
        if (!this.doc.worksheets[sheet]) {
            try {
                const newSheet = await this.doc.addWorksheet({
                    title: `${sheet}`,
                    tabColor: {

                    }
                });
                if (newSheet) {
                    this.doc.worksheets[sheet] = newSheet;
                }
            } catch (error) {
                throw new Error('Cannot create sheet');
            }

        }

        const baseObject = await this.handleHeader(dataObject[0], sheet);
        baseObject.data = dataObject;
        if (baseObject.fields.indexOf('keyid') === -1) {
            baseObject.fields.push('keyid');
        }

        baseObject.data.forEach((row: any) => {
            row.keyid = uuidv1();
            prepareObject(row);
        });

        await this.doc.worksheets[sheet].addRows(baseObject.data, baseObject.fields);

        baseObject.data.forEach((row: any) => {
            parseObject(row);
        });
        this.loaded[sheet] = false;
        this.sheets[sheet] = await this.doc.worksheets[sheet].getRows();
        this.loaded[sheet] = true;
        return baseObject.data;
    }

    public async delete<Model>(sheet: string, dataObject: Partial<{ keyid: string }>): Promise<Model> {
        await this.doc.useServiceAccountAuth(this.credentials!);
        await this.doc.getInfo();

        //this.errorHandler(err, reject);
        const data = await this.doc.worksheets[sheet].getRows();
        this.sheets[sheet] = data;

        // Authenticate with the Google Spreadsheets API.
        const row = this.sheets[sheet].filter((rowData: any) => {
            return rowData.data['keyid'] === dataObject['keyid'];
        });

        await row[0].del();
        const result = row[0].data;
        this.loaded[sheet] = false;
        this.sheets[sheet] = await this.doc.worksheets[sheet].getRows();
        this.loaded[sheet] = true;
        return result;
    }

    public async deleteMany(sheet: string, rowKeys: string[]): Promise<number[]> {
        await this.doc.useServiceAccountAuth(this.credentials!);
        await this.doc.getInfo();

        //this.errorHandler(err, reject);
        const data = await this.doc.worksheets[sheet].getRows();
        this.sheets[sheet] = data;

        const indices: number[] = [];
        rowKeys.forEach((key) => {
            this.sheets[sheet].forEach((rowData: any, index: number) => {
                if (rowData.data['keyid'] === key) {
                    indices.push(index + 1)
                }
            });
        });

        indices.sort((a, b) => (a > b) ? -1 : 1);

        this.loaded[sheet] = false;
        await this.doc.worksheets[sheet].removeRows(this.doc.worksheets[sheet].id as any, indices);
        // this.loaded[sheet] = true;
        return indices;
    }

    public async update<Model>(sheet: string, dataObject: Partial<Model>): Promise<Partial<Model>> {

        await this.doc.useServiceAccountAuth(this.credentials!);
        await this.doc.getInfo();
        const baseObject = await this.handleHeader(dataObject, sheet);



        const row = this.sheets[sheet].filter((rowData: SpreadsheetRow<Model>) => {
            if (rowData.data) {
                return keyid(rowData.data) === keyid(dataObject);
            }
            return false;
        });

        if (row.length > 0) {
            Object.assign(row[0].data, dataObject);
            baseObject.data = prepareObject(row[0].data);
            const result = await this.doc.worksheets[sheet].updateRow(row[0].index, baseObject.data, baseObject.fields);

            return result.data as Partial<Model>;
        } else {
            throw new Error('object not found');
        }
    }

    public async updateBy<Model>(sheet: string, dataObject: Partial<Model>, filter: (row: SpreadsheetRow<Model>) => {}): Promise<SheetDataResult<Model>> {

        await this.doc.useServiceAccountAuth(this.credentials!);
        await this.doc.getInfo();
        const baseObject = await this.handleHeader(dataObject, sheet);
        const row = this.sheets[sheet].filter(filter);
        if (row.length > 0) {
            baseObject.data = row[0].data;

            Object.assign(baseObject.data, dataObject);
            const updateResult = await this.doc.worksheets[sheet].updateRow<Model>(row[0].index, baseObject.data, baseObject.fields);
            return new SheetDataResult<Model>([updateResult.data]);
        } else {
            return new SheetDataResult<Model>([]);
        }
    }

    public async query<Model>(sheet: string, query?: (row: SpreadsheetRow<Model>) => {},useCache: boolean=true,
        start: number = 0, end: number = 9, sorts?: SortRequest[]): Promise<SheetDataResult<Model>> {

        try {
            const ready = new Promise(async (resolve, reject) => {
                if (!this.loaded[sheet] || !this.sheets[sheet] || !useCache) {
                    this.sheets[sheet] = [];
                    await this.doc.useServiceAccountAuth(this.credentials!);
                    this.info = await this.doc.getInfo();

                    if (!this.doc.worksheets[sheet]) {
                        return reject({ info: this.info, data: [] });
                    }

                    this.sheets[sheet] = await this.doc.worksheets[sheet].getRows();
                    this.loaded[sheet] = true;
                    return resolve();
                } else {
                    if (!this.sheets[sheet]) {
                        //wait for completetion before result
                        this.intervals[sheet] = setInterval(() => {
                            if (this.sheets[sheet]) {
                                clearInterval(this.intervals[sheet]);
                                resolve();
                            }
                        }, 300);
                    } else {
                        resolve();
                    }
                }

            });

            let reverse = 1;
            let sortField = 'keyid';
            if (sorts && sorts.length > 0) {
                reverse = (sorts[0].direction !== 'asc') ? -1 : 1;
                sortField = sorts[0].colId;
            }

            await ready;

            let resultObject: { info: PagingInfo, data: Model[] } = {
                info: { total: 0 }, data: []
            }

            function sort(arr: any[]) {
                return arr.sort((a: SpreadsheetRow<Model>, b: SpreadsheetRow<Model>) => {
                    return ((a.data as Dictionary)[sortField] < (b.data as Dictionary)[sortField]) ? -1 * reverse : 1 * reverse
                })
            }
            if (query) {
                if (this.sheets[sheet]) {
                    resultObject.data = sort(this.sheets[sheet]).filter(query).map((d: SpreadsheetRow<Model>) => d.data);
                    resultObject.info.total = resultObject.data.length;
                }

            } else {
                resultObject.data = sort(this.sheets[sheet]).map((d: SpreadsheetRow<Model>) => d.data);
                resultObject.info.total = this.sheets[sheet].length;
            }

            resultObject.data = resultObject.data.slice(start, end);
            return resultObject;

        } catch (error) {
            return ({ info: { total: 0 }, data: [] });
        }
    }
}