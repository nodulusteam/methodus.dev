import creds from './service-account-creds';
import { GoogleSpreadsheet } from '../GoogleSpreadsheet';


(async () => {
  const sheetWorker = new GoogleSpreadsheet('');
  sheetWorker.auth_mode = 'jwt';

  await sheetWorker.useServiceAccountAuth(creds);
  const response: any = await sheetWorker.addSpreadsheet('test-db');


  const sheetId = response.spreadsheetId;
  const shareResult = await sheetWorker.shareSpreadsheet(sheetId, 'roi.benhaim@gmail.com', 'writer');
  console.log(shareResult);

})()



