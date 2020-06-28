
import { SpreadsheetRow } from './SpreadsheetRow';
import { GoogleSpreadsheet } from './GoogleSpreadsheet';

export class SpreadsheetWorksheet {
    spreadsheet: GoogleSpreadsheet;
    data: any;
    url: string = '';
    id: string = '';
    title: string = '';
    rowCount: number = 0;
    colCount: number = 0;

    constructor(spreadsheet: any, data: any) {
        this.spreadsheet = spreadsheet;
        this.data = data.properties || data;
        this.id = this.data.sheetId;
        this.title = this.data.title;
        this.rowCount = this.data.gridProperties.rowCount;
        this.colCount = this.data.gridProperties.columnCount;
    }

    async getHeaderRow<Model>() {
        return this.spreadsheet.getHeaderRow<Model>(this.title);
    }

    async getRows() {
        return this.spreadsheet.getRows(this.title);
    }


    async updateRow<Model>(index: number, data: any, headerRow: any[]): Promise<SpreadsheetRow<Model>> {
        return this.spreadsheet.updateRow(this.data.sheetId, data, headerRow, index);
    }

    async addRow<Model>(data: Partial<Model>, headerRow: string[]) {
        return this.spreadsheet.addRow(this.data.sheetId, data, headerRow);
    }
    async addRows<Model>(data: Partial<Model>[], headerRow: string[]) {
        return this.spreadsheet.addRows(this.data.sheetId, data, headerRow);
    }




    async del(sheetId: number, rangeIndex: number) {
        await this.spreadsheet.removeRow(sheetId, rangeIndex);
    }

    async removeRows(sheetId: number, indices: number[]) {
        return await this.spreadsheet.removeRows(sheetId, indices);
    }


    // async setHeaderRow(values: any) {
    //     if (!values) return;
    //     if (values.length > this.colCount) {
    //         throw new Error('Sheet is not large enough to fit ' + values.length + ' columns. Resize the sheet first.');
    //     }

    //     const headerPayload = {
    //         "range": `${this.id}!A1:Z1`,
    //         "majorDimension": "ROWS",
    //         "values": [
    //             values,

    //         ],
    //     }
    //     const response: any = await this.spreadsheet.makeFeedRequest([this.spreadsheet.id, 'values', `${this.id}!A1:Z1`], 'PUT', headerPayload);


    // }
}
