# @tmla/data 

## Classes

### Query

@tmla/data/query - This module was developed for the purpose of working with MongoDB which will help us make a very easy transition from the RETHINKDB which we used in THINKY ORM to work with MongoDB.

`npm i @tmla/data -S`

#### Hello JQL

### The Query class
`
 constructor(public collectionName?: string | any)
`

*Arguments*
* `collectionName` - Optional. the name or the Class type of the collection in the db.

## Methods 

### paging(pageNum,pageSize)
```javascript 
 public paging(pageNum: number | string, pageSize: number | string): Query
```

*Arguments*
* `pageNum` - requested page number.
* `pageSize` - requested page size.


### transform()
```javascript
public transform(): Query
```

### unTransform()
```javascript
public unTransform(): Query
```

### count(key)
```javascript 
 public count(key): Query
```

*Arguments*
* `key` - alias of the count command.
* 



### order(fieldName,direction)
```javascript 
 public order(fieldName: string, direction: string): Query
```

*Arguments*
* `fieldName` - field name.
* `direction` - direction => asc,desc.


###  public toQuery(options)
```javascript 
 public toQuery(options?: any)
```

*Arguments*
* `options` - Optional. tbd.



### merge(_from,_localField,_foreignField,_as)
```javascript 
 public merge(_from: string, _localField: string, _foreignField: string, _as: string): Query
```

*Arguments*
* `_from` - lookup table name.
* `_localField` - root table field.
* `_foreignField` - lookup table field.
* `_as` - alias of the lookup result.


### unwind(_path,_includeArrayIndex,_preserveNullAndEmptyArrays)
```javascript 
public unwind(_path: string, _includeArrayIndex?: string, _preserveNullAndEmptyArrays?: boolean): Query
```

*Arguments*
* `path` - Field path to an array field. To specify a field path, prefix the field name with a dollar sign $.
* `arrayIndex` - Optional. The name of a new field to hold the array index of the element.
* `preserveNullAndEmptyArrays` - Optional. If true, if the path is null, missing, or an empty array, $unwind outputs the document. If false, $unwind does not output a document if the path is null, missing, or an empty array.





### addFields(_addFields)
```javascript 
public addFields(_addFields: Array<any>): Query
```

*Arguments*
* `_addFields` - [{ "users.role": "$role" }] get Array key, value and put the value inside the key for each item.


### group(options)
```javascript 
public group(options: any): Query
```

*Arguments*
* `options` - more options for group results, complicated options for example, $setUnion,$size, etc...

### filter(filterHolder)
```javascript 
public filter(filterHolder: any): Query
```

*Arguments*
* `filterHolder` - filter parameters.



### pluck(model,args)
```javascript 
public filter(model: any, ...args): Query
```

*Arguments*
* `model` - instance of the model with metadata properties to project them out.
* `args` - additional args to project.



### without(args)
```javascript 
public without(...args): Query
```

*Arguments*
* `args` - exlude args from the project.

### save(data)
```javascript 
public save(data: any): Query
```

*Arguments*
* `data` - inserted value to database.



### update(filter,updateData)
```javascript 
public update(filter: any, updateData: any): Query
```

*Arguments*
* `filter` - filter parameters before update.
* `updateData` - inserted value to database



### insert(data)
```javascript 
public insert(data: any): Query
```

*Arguments*
* `data` - inserted value to database.



### get(filter)
```javascript 
public get(filter: any): Query
```

*Arguments*
* `filter` - filter parameters to get single value from db.


### run(options)
```javascript 
public insert(options?: any): Query
```

*Arguments*
* `options` - filter parameters to get single value from db.

