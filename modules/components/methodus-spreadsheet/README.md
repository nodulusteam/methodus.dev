# V4 Google Spreadsheet Access (node.js)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_methodus-spreadsheet&metric=alert_status)](https://sonarcloud.io/dashboard?id=nodulusteam_methodus-spreadsheet)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_methodus-spreadsheet&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=nodulusteam_methodus-spreadsheet)


This is a CRUD based operations package for Google sheets.


### API

```typescript
import { Sheet, getSheet, SheetDataResult } from '@methodus/google-spreadsheet';

const sheet:Sheet = getSheet(sheetId, {client_email: 'test@gmail.com',  private_key: 'XXXXXXXXXXXX'});

```

Get filtered rows
```typescript
function filter(row: SpreadsheetRow<Model>){
    return row.data.email === email
}

const result = sheet.query<Model>('Sheet1', filter, start, end, sorts);

```


Insert 
```typescript
 
const data = new Model();
const result = sheet.insert<Model>('Sheet1',data);

const result = sheet.insertMany<Model>('Sheet1',[data]);

```

Update 
```typescript
 
const data = new Model();
data.keyid = keyvalue;
const result = sheet.update<Model>('Sheet1',data);

function filter(row: SpreadsheetRow<Model>){
    return row.data.email === email
}

const result = sheet.updateBy<Model>('Sheet1',filter, data);

```



Delete 
```typescript
 
const data = new Model();
data.keyid = keyvalue;
const result = sheet.delete<Model>('Sheet1',data);

const result = sheet.deleteMany<Model>('Sheet1',[keyvalue,keyvalue,keyvalue]);

```