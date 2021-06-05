// tests/config.js
const path = require('path');


var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { Query, } from '../../query';
import { Model, Field, Virtual, Lookup, ObjectId, IsoDate } from '../../decorators';
import { Transform, TransformDirection } from '../../enums/';



process.env.TEST = 'true';
process.env.NODE_ENV = "debug";
process.env.NODE_CONFIG_ENV = "local";
process.env.NODE_LOG_DIR = "./logs";




@Model('Alert', Transform.Automatic)
class Alert {

    @ObjectId()
    @Field('id')
    public _id: string;

    @Field('_id')
    public id: string;


    @Field('alert.title')
    public alert_title: string;
}


describe('test the odm', function () {
    it('filter using ObjectID', function () {

        process.env.TEST = 'true';
        process.env.NODE_ENV = "debug";
        process.env.NODE_CONFIG_ENV = "local";
        process.env.NODE_LOG_DIR = "./logs";

        let query = new Query(Alert).filter({ 'id': '596e16f5bfdc9dbe27c41398' });

        let matchObject = JSON.stringify([{ "$match": { "$and": [{ "_id": "596e16f5bfdc9dbe27c41398" }] } }]);
        expect(JSON.stringify(query.toQuery())).to.equal(matchObject);
    });
});
