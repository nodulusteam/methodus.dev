const path = require('path');
 

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
import { Query } from '../../query';
import { Model, Field, Virtual, Lookup, ObjectId, IsoDate } from '../../decorators';
import { Repo } from '../../repo'
import { truncateCollections } from '../setup';
import { DBHandler } from '../..';



process.env.TEST = 'true';
process.env.NODE_ENV = 'debug';
process.env.NODE_CONFIG_ENV = 'local';
process.env.NODE_LOG_DIR = './logs';



@Model('InjestedAlert')
class InjestedAlert extends Repo<InjestedAlert> {

    @ObjectId()
    @Field() 
    public _id: string
    constructor(data?: any) {
        super(data, InjestedAlert)
    }
}
@Model('Alert')
class Alert extends InjestedAlert {
    @ObjectId()
    @Field() 
    public alert_id: string
    constructor(data?: any) {
        super(data)
    }
}


describe('test the odm', function () {
    afterEach(async () => {
        await truncateCollections();
    });

    DBHandler.config = {
        connections: {
            default: {
                server: process.env.MONGO_URL
            },
        },
    };
    
    it('filter using ObjectID', function () {

        process.env.TEST = 'true';
        process.env.NODE_ENV = 'debug';
        process.env.NODE_CONFIG_ENV = 'local';
        process.env.NODE_LOG_DIR = './logs';
        const query = new Query(Alert).filter({ '_id': '596e16f5bfdc9dbe27c41398' });
        const matchObject = JSON.stringify([{ '$match': { '$and': [{ '_id': '596e16f5bfdc9dbe27c41398' }] } }]);
        expect(JSON.stringify(query.toQuery())).to.equal(matchObject);
    });
});
