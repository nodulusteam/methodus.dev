let RowSpreadsheet: any = null;

export class SpreadsheetRow<Model=any> {
    data: Model;
    index: number;
    sheetId: string;

    constructor(spreadsheet: any, data: any, sheetId: string, rowIndex: number) {
        RowSpreadsheet = spreadsheet;
        this.sheetId = sheetId;
        this.data = data;
        this.index = rowIndex;

    }

    async del() {
        await RowSpreadsheet.removeRow(this.sheetId, this.index);
    }
}
