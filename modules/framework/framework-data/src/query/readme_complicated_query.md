
# @tmla/data/query

## Converting RethinkDB queries to MongoDB using JQL Database Abstraction Layer

### Query

@tmla/data/query This module has been developed for the purpose of working with MongoDB which will help us make a very easy transition from the RethinkDB which we used in Thinky ORM to working with MongoDB.

Examples of writing in front of the Thinky ORM vs. the @query for MongoDB:

RethinkDB:

```javascript
let response: any = {
        success: true,
        results: null
    }, deferred = Q.defer ();
r.db('seta2').table('User')
        .run ()
        .then (function (result) {
            If (result && result.length> 0) {
                response.results = result;
            }
            deferred.resolve(response);
        })
        .catch (Errors.DocumentNotFound, function (error) {
            response.success = false;
            response.error = 'getUserByFilter';
            deferred.reject(response);
        })
        .error (function (error) {
            response.success = false;
            response.error = error;
            deferred.reject(response);
        });

return deferred.promise;
```

MongoDB

```javascript
import { User } from 'SOMEADDRESS';
let response: any = {
        success: true,
        results: null
    };

Try {
response.results = await new Query(User).run();
}
catch (error) {
response.success = false;
response.error = error;
}
return response;
```
In this query we will accept all the users we have in the system.

notice the use of the new async => await new Query(User).run()

What we will get from this command is a query on MongoDB:

```
db.getCollection('User').aggregate([]);
```

Another example is a bit more complex


RethinkDB

```javascript

r.table('Company')
            .get(params.company_id)
            .merge(function (company) {
                var users = r.table('User')
                    .orderBy(orderByForQuery)//Not implemented
                    .filter(function (user) {
                        return user("_company_id").eq(company('_id')).or(user('_companies').contains({
                            'id': company('_id')
                        }));
                    })
                    .merge(function (user) {
                        return {
                            role: r.table('UserRole').get(user('role_id'))
                        };
                    }).merge(function (user) {
                        return {
                            role_name: r.table('UserRole').get(user('role_id')).pluck('name').default({ name: '' })('name')
                        };
                    })
                    .filter(filterHolder)
                    .filter(isExternal ? filterShowOnlyExternalUsers : true);
                return {
                    //.orderBy(search.order_by_sort)
                    users: users
                        .slice(search.slice_start - search.page_size, search.slice_start)
                        .coerceTo('array'),
                    total_users: users.count()
                };
            })

```


MongoDB

```javascript
   new Query(Company).filter({ '_id': params.company_id })
   .merge("User", "_id", "company_id", "users") // $lookup => join user.company_id = company._id
   .merge("User", "id", "_companies.id", "users_addition") // $lookup => join user._companies.id = company._id
   .pluck(new Company(),
   { total_users: { $size: { $setUnion: ["$users", "$users_addition"] } },
   "users": { "$setUnion": ["$users", "$users_addition"] } }) //
   .unwind("$users") // $unwind => Coerce array to object
   .merge("UserRole", "users.role_id", "_id", "role") // $lookup => join userrole._id = user.role_id
   .unwind("$role") // $unwind => Coerce array to object
   .addFields([{ "users.role": "$role" }]) // $addFields => move role object into users.role
   .group({ // $group => group the results,
         // $$ROOT => References the root document, i.e. the top-level document, currently being processed in the aggregation pipeline stage..
         "_id": "$_id",
         "created_at": { $first: '$$ROOT.created_at' },
         "created_by": { $first: '$$ROOT.created_by' },
         "email": { $first: '$$ROOT.email' },
         "fax_number": { $first: '$$ROOT.fax_number' },
         "name": { $first: '$$ROOT.name' },
         "primary_phone": { $first: '$$ROOT.primary_phone' },
         "status": { $first: '$$ROOT.status' },
         "id": { $first: '$$ROOT.id' },
         "total_users": { $first: '$$ROOT.total_users' },
         "users": { "$push": "$users" }
         });
```



This query passes through all the companies and outputs a match with an id field whose value is Maxim.

```javascript
.filter({ '_id': params.company_id })

```
the result of the filter command

```JSON
{
    $match: {
            id: 'Maxim'
        }
    }

```


```javascript
.merge("User", "_id", "company_id", "users") // $lookup => join user.company_id = company._id
```
For all companies do JOIN with the Users table using the lookup command.
```JSON{
         $ lookup: {
             from: "User",
             localField: "_id", // ROOT TABLE field => Company
             foreignField: "company_id", // Join table (User)
             as: "users"
         }
     }
```

```javascript
.merge("User", "id", "_companies.id", "users_addition") // $lookup => join user._companies.id = company._id
```
Find the company_id field in the user table that is equal to the _id field in the Company table.

```JSON
{
  "$lookup": {
    "from": "User",
    "localField": "id", // ROOT TABLE field => Company
    "foreignField": "_companies.id" // [{id:'Maxim'},{id:'POC'}], checking if id in _companies array
    "as": "users_addition"
  }
}
```


```javascript
.pluck(new Company(),
   { total_users: { $size: { $setUnion: ["$users", "$users_addition"] } },
   "users": { "$setUnion": ["$users", "$users_addition"] } })
```

the result of the pluck command is:
```JSON
{
        $project:{
            _id : 1,
            contact : 1,
            created_at : 1,
            created_by : 1,
            email : 1,
            fax_number : 1,
            name : 1,
            physical_address : 1,
            primary_phone : 1,
            status : 1,
            id : 1,
            total_users: { $size: {$setUnion: [ "$users", "$users_addition" ] }} // merging two arrays and get them length.
            users: {$setUnion: [ "$users", "$users_addition" ] } // merging the arrays to single array.
        }
    }

```


```javascript
.unwind("$users") // $unwind => Coerce array to object

```

unwind the users collection that we got to get for each user in our collection is role.


```JSON
{
        $unwind: {
            path: "$users",
            preserveNullAndEmptyArrays: true
        }
    }
```


```javascript
.merge("UserRole", "users.role_id", "_id", "role")
```

doing join with our users collection that we have to get is role.


```javascript
	.unwind("$role") // coerce role to object => UI expect to get role as object.
```

Next we want to put role object inside the user collection
```javascript
.addFields([{ "users.role": "$role" }]) // $addFields => move role object into users.role
```

next we want to group the result with the main company using the command group

```javascript
.group({ // $group => group the results,
         // $$ROOT => the entry point for the query in this example = Company.
         "_id": "$_id", // group by _id in Company Table.
         "created_at": { $first: '$$ROOT.created_at' }, // $first => Accumulator Operator,Returns a value from the first document for each group. Order is only defined if the documents are in a defined order.

Available in $group stage only.
         "created_by": { $first: '$$ROOT.created_by' },
         "email": { $first: '$$ROOT.email' },
         "fax_number": { $first: '$$ROOT.fax_number' },
         "name": { $first: '$$ROOT.name' },
         "primary_phone": { $first: '$$ROOT.primary_phone' },
         "status": { $first: '$$ROOT.status' },
         "id": { $first: '$$ROOT.id' },
         "total_users": { $first: '$$ROOT.total_users' },
         "users": { "$push": "$users" } // $push => Accumulator Operator, Returns an array of expression values for each group.

Available in $group stage only.
         });
```

result of the group command:

```JSON

 {
        "$group": {
            "_id": "$_id",
            "contact" : { $first: '$$ROOT.contact' },
            "created_at" : { $first: '$$ROOT.created_at' },
            "created_by" : { $first: '$$ROOT.created_by' },
            "email" : { $first: '$$ROOT.email' },
            "fax_number" : { $first: '$$ROOT.fax_number' },
            "name" : { $first: '$$ROOT.name' },
            "physical_address" : { $first: '$$ROOT.physical_address' },
            "primary_phone" : { $first: '$$ROOT.primary_phone' },
            "status" : { $first: '$$ROOT.status' },
            "id" : { $first: '$$ROOT.id' },
            "total_users" : { $first: '$$ROOT.total_users' },
            "users": { "$push": "$users" }
        }
    }

```



Completed Query:

``` JSON


db.getCollection('Company').aggregate([{
    $match: {
            id: 'Maxim'
        }
    },
    {
        $lookup: {
            from: "User",
            localField: "_id",
            foreignField: "company_id",
            as: "users"
        }
    },
    {$lookup: {from: "User", localField: "id", foreignField: "_companies.id", as: "users_addition"}},
    {
        $project:{
            _id : 1,
            contact : 1,
            created_at : 1,
            created_by : 1,
            email : 1,
            fax_number : 1,
            name : 1,
            physical_address : 1,
            primary_phone : 1,
            status : 1,
            id : 1,
            total_users: { $size: {$setUnion: [ "$users", "$users_addition" ] }},
            users: {$setUnion: [ "$users", "$users_addition" ] }
        }
    },
    {
        $unwind: {
            path: "$users",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $lookup: {
            from: "UserRole",
            localField: "users.role_id",
            foreignField: "_id",
            as: "role"
        }
    },
    {
        $unwind: {
            path: "$role",
            preserveNullAndEmptyArrays: true
        }
    },
    {
           "$addFields": {
              "users.role": "$role"
           }
    },
    {
        "$group": {
            "_id": "$_id",
            "contact" : { $first: '$$ROOT.contact' },
            "created_at" : { $first: '$$ROOT.created_at' },
            "created_by" : { $first: '$$ROOT.created_by' },
            "email" : { $first: '$$ROOT.email' },
            "fax_number" : { $first: '$$ROOT.fax_number' },
            "name" : { $first: '$$ROOT.name' },
            "physical_address" : { $first: '$$ROOT.physical_address' },
            "primary_phone" : { $first: '$$ROOT.primary_phone' },
            "status" : { $first: '$$ROOT.status' },
            "id" : { $first: '$$ROOT.id' },
            "total_users" : { $first: '$$ROOT.total_users' },
            "users": { "$push": "$users" }
        }
    }
])


```


The result will be returned as array.

```JSON
The result will be returned as array.
[{
"_id" : ObjectId("595b6312a407522780df4dc5"),
"created_at" : ISODate("2017-01-09T15:50:24.319Z"),
"created_by" : "system",
"email" : "mk245r@att.com",
"fax_number" : 9725278022006.0,
"name" : "Maxim",
"primary_phone" : 9725278022006.0,
"status" : true,
"id" : "Maxim",
"total_users" : 11,
"users" : [
{
"_id" : ObjectId("595b6363a407522780dfaf32"),
"_companies" : [
{
"id" : "Maxim"
},
{
"id" : "deviceTEST"
}
],
"_company_id" : "POC",
"alternate_phone" : null,
"attUID" : "jy2359",
"company_id" : ObjectId("595b6312a407522780df4dce"),
"created_at" : ISODate("2006-12-06T19:55:08.000Z"),
"created_by" : "system",
"email" : "hcary122@opsecurity.com",
"first_name" : "Jeffrey",
"last_login_datetime" : ISODate("2007-07-01T06:00:00.000Z"),
"last_name" : "Yates",
"primary_phone" : "972544569873",
"role_id" : ObjectId("594f8d0084784b2700e1458e"),
"security_exception" : [],
"status" : true,
"text_number" : {
"number" : "972544569873",
"type" : "primary"
},
"username" : "jy2359",
"id_old" : "122",
"company_id_old" : "HJwCLezMx",
"company_name" : "POC",
"role_name" : "Customer Admin",
"role_id_old" : "e96502e4-7a09-40af-9336-ce498ac68383",
"role" : {
"_id" : ObjectId("594f8d0084784b2700e1458e"),
"created_at" : ISODate("2016-07-26T08:27:35.745Z"),
"created_by" : "system",
"level" : "external",
"name" : "Customer Admin",
"order" : 3,
"role" : "admin",
"id_old" : "e96502e4-7a09-40af-9336-ce498ac68383"
}
},
{
"_id" : ObjectId("595b6363a407522780dfaf35"),
"_companies" : [
{
"id" : "Maxim"
},
{
"id" : "POC"
}
],
"_company_id" : "POC",
"alternate_phone" : null,
"attUID" : "hcary129",
"company_id" : ObjectId("595b6312a407522780df4dce"),
"created_at" : ISODate("2006-12-06T19:55:08.000Z"),
"created_by" : "system",
"email" : "hcary129@opsecurity.com",
"first_name" : "Peter ",
"last_login_datetime" : ISODate("2007-07-01T06:00:00.000Z"),
"last_name" : "Buttros ",
"primary_phone" : "972544569873",
"role_id" : ObjectId("594f8d0084784b2700e1458c"),
"security_exception" : [],
"status" : true,
"text_number" : {
"number" : "972544569873",
"type" : "primary"
},
"username" : "hcary129",
"id_old" : "129",
"company_id_old" : "HJwCLezMx",
"company_name" : "POC",
"role_name" : "ATT Analyst",
"role_id_old" : "6126514a-bb3f-4fa3-ae88-27037c88d1cf",
"role" : {
"_id" : ObjectId("594f8d0084784b2700e1458c"),
"created_at" : ISODate("2016-07-26T08:27:00.365Z"),
"created_by" : "system",
"level" : "internal",
"name" : "ATT Analyst",
"order" : 2,
"role" : "user",
"id_old" : "6126514a-bb3f-4fa3-ae88-27037c88d1cf"
}
}
]
}]
```