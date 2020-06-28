import 'reflect-metadata';
import creds from './service-account-creds';
import { GoogleSpreadsheet } from '../GoogleSpreadsheet';



describe('Test Spreadsheet creation', () => {
  let sheetWorker;
  let spreadsheetId;


  beforeAll(async () => {
    sheetWorker = new GoogleSpreadsheet('');
    sheetWorker.auth_mode = 'jwt';
    await sheetWorker.useServiceAccountAuth(creds);

  });

  test('should create a new worksheet with a title', async () => {
    const TITLE = 'test-db title';
    const response = await sheetWorker.addSpreadsheet(TITLE);
    expect(response.properties.title).toBe(TITLE)
    spreadsheetId = response.spreadsheetId;
    expect(spreadsheetId).toBeDefined();
  });

  test('should share the sheet with a user', async () => {
    const shareResult = await sheetWorker.shareSpreadsheet(spreadsheetId, 'roi.benhaim@gmail.com', 'writer');
    expect(shareResult.type).toBe('user');
    expect(shareResult.role).toBe('writer');
  });
});
