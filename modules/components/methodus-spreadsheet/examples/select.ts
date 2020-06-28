import { SheetDataResult, getSheet, Sheet } from '../src';
import { Model } from './model';

const SHEETID = '0000-00000-00000-00000';

(async () => {
    const sheet: Sheet = getSheet(SHEETID, {
        client_email: 'test@gmail.com',
        private_key: 'XXXXXXXXXXXX'
    });

    const result: SheetDataResult<Model> = await sheet.query<Model>('Sheet1');
    
    // result.info.total //number of total rows
    // result.data // an array of <Model>
})();
