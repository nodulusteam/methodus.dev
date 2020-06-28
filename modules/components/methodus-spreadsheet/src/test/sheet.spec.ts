import 'reflect-metadata';
import faker from 'faker';
import { Sheet, getSheet, SheetDataResult } from '../Sheet';
import { sheet_ids } from './config';
import creds from './service-account-creds';
import { SpreadsheetRow } from '../SpreadsheetRow';
import { WebResponse } from '../interfaces';


const docs: { [key: string]: Sheet } = {};

class SheetModel {
  email?: string;
  keyid?: string;
  dateentered?: Date;
  fields: any[] = [];
  some?: any;
  status?: string;
}


function createRow(): SheetModel {

  return {
    keyid: faker.random.alphaNumeric(10),
    email: faker.internet.email(),
    dateentered: faker.date.recent(5),
    status: faker.random.word(),
    fields: []
  }

}

describe('Authentication', () => {
  beforeAll(() => {
    Object.keys(sheet_ids).forEach(function (key) {
      docs[key] = getSheet(sheet_ids[key], creds);
    });
  });

  describe('reading + getInfo', () => {
    test('getInfo should work on a private doc', async () => {
      jest.setTimeout(1000 * 30)
      for (const sheet of Object.values(docs)) {
        try {
          const results = await sheet.query<Sheet>('test');
          expect(results.info?.total).toBeDefined();
          expect(results).toBeDefined();

        } catch (error) {
          expect(false).toBeTruthy();
        }
      }
    });
  });




  describe('writing private doc', () => {
    let insertedRow: any = createRow();
    let updatedRow: Partial<SheetModel>;
    describe('insert', () => {
      test('into new Sheet', async () => {
        const results = await docs['private'].insert<SheetModel>('test1', insertedRow);
        expect(results).toBeDefined();
        expect(results!.email).toBe(insertedRow.email);
        expect(results!.keyid).toBeDefined();
        expect(results!.dateentered?.getTime()).toBeDefined();
        expect(results).toBeDefined();
      });

      test('simple', async () => {
        docs['private'].info = undefined;
        const data = createRow();

        const results = await docs['private'].insert<SheetModel>('test', data);
        expect(results!.email).toBe(data.email);
        expect(results!.dateentered?.getTime()).toBeDefined();
        expect(results!.keyid).toBeDefined();
        insertedRow = results;
        expect(results).toBeDefined();
      });

      test('many', async () => {
        docs['private'].info = undefined;
        const arr: SheetModel[] = [];
        for (let i = 0; i < 10; i++) {
          arr.push(createRow())
        }
        const results = await docs['private'].insertMany<SheetModel>('test', arr);
        expect(results[0].dateentered?.getTime()).toBeDefined();
        expect(results).toBeDefined();
        expect(results.length).toBe(10);
      });

      test('objects', async () => {
        docs['private'].info = undefined;
        const row = createRow();
        row.fields = [{ name: 'field1' }, { name: 'field2' }];
        row.some = undefined;
        const results = await docs['private'].insert<SheetModel>('test', row);
        insertedRow = results;
        expect(results).toBeDefined();
        expect(results!.keyid).toBeDefined();
      });

    });

    describe('update', () => {

      test('simple', async () => {
        insertedRow.email = faker.internet.email();
        updatedRow = await docs['private'].update('test', insertedRow);
        const results = await docs['private'].query('test');
        expect(updatedRow.email).toBe(insertedRow.email);
        return results;
      });

      test('objects', async () => {
        const email2 = faker.internet.email();
        updatedRow = await docs['private'].update('test', { keyid: insertedRow.keyid, email: email2, some: undefined, fields: [{ name: 'field1' }, { name: 'field2' }] });
        const results = await docs['private'].query('test');
        expect(updatedRow.email).toBe(email2);
        return results;
      });



      test('updateBy', async () => {

        const updatedResults = await docs['private'].query<SheetModel>('test', (row: SpreadsheetRow<SheetModel>) => row.data.email === insertedRow.email);
        const newEmail = faker.internet.email();
        const results: SheetDataResult<SheetModel> = await docs['private'].updateBy<SheetModel>('test', { email: newEmail },
          (row: SpreadsheetRow<SheetModel>) => {
            return row.data['email'] === updatedRow.email;
          });

        if (results.data.length) {
          expect(results.data[0].email).toBe(newEmail);
        } else {

          expect(true).toBeFalsy();
        }
        return updatedResults;
      });
    });



    describe('test sorting', () => {
      test('sort asc', async () => {
        const all = await docs['private'].query<SheetModel>('test', undefined, true, 0, 100, [{ colId: 'email', direction: 'asc' }]);
        expect(all).toBeDefined();
      });
      test('sort desc', async () => {
        const all = await docs['private'].query<SheetModel>('test', undefined, true, 0, 100, [{ colId: 'email', direction: 'desc' }]);
        expect(all).toBeDefined();
      });
    });



    test('remove from private doc', async () => {
      const results = await docs['private'].delete<SheetModel>('test', insertedRow);
      expect(results).toBeDefined();
    });






    test('deleteMany', async () => {
      const all = await docs['private'].query<SheetModel>('test', undefined, true, 0, 100, [{ colId: 'keyid', direction: 'asc' }]);
      const results = await docs['private'].deleteMany('test', all.data.map((row: any) => row.keyid));
      expect(results).toBeDefined();
      expect(results.length).toBe(all.data.length);
    });



    test('removeWorksheet', async () => {
      const info = docs['private'].info;
      if (info) {
        for (const worksheet of info.worksheets) {
          if (worksheet.title !== 'test') {
            const removeResult: WebResponse = await docs['private'].doc.removeWorksheet(worksheet.id) as unknown as WebResponse;
            expect(removeResult).toBeDefined();
          }
        }
      }
    });
  });
});
