// tests/config.js
const path = require('path');


var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
import { Query } from '../../query';
import { Repo } from '../../repo';
import { Connection, Model, Field, Virtual, Lookup, ObjectId, IsoDate } from '../../decorators';
import { Transform } from '../../enums';
import { ObjectID } from 'mongodb';

process.env.TEST = 'true';
process.env.NODE_ENV = 'debug';
process.env.NODE_CONFIG_ENV = 'local';
process.env.NODE_LOG_DIR = './logs';
//

@Model('Alert', Transform.Automatic)
@Connection('alert')
class Alert extends Repo<Alert> {
    @ObjectId()
    @Field()
    public _id: string;
    @Field()
    public alert_title: string

    @Field()
    public created_at: string;
    @Field()
    public severity: string;

    @Lookup('@tmla-contracts/user', 'User', 'byId', 'created_by', 'username')
    @Field()
    public created_by_name: string

    // /**
    //  *simple get, return single item.
    //  */
    // public async get() {
    //     //let o = new ObjectID('59771417d729db1d90ac7459');
    //     // get document by primary key.
    //     //let dbRespone = await Query(Alert).get('59771417d729db1d90ac7459');
    //     let dbRespone = await Repo.get('59771417d729db1d90ac7459');
    //     console.log('get', JSON.stringify(dbRespone));
    // }
    // /**
    //  *get filter, same as rethink, return an array.
    //  */
    // public async filter() {
    //     let dbRespone = await new Query(Alert).filter({ '_id': '59771417d729db1d90ac7459' }).run();
    //     console.log('filter', JSON.stringify(dbRespone));
    // }

    // public async filterByCompany() {
    //     let dbRespone = await new Query(Alert).filter({ '_company_id': 'HAS' }).paging(1, 1).run();
    //     console.log('filterByCompany', JSON.stringify(dbRespone));
    // }

    // public async filter_in() {
    //     let dbRespone = await new Query(Alert).filter({ '_id': { '$in': ['59771417d729db1d90ac7459', '59771417d729db1d90ac745a', '59771417d729db1d90ac745d'] } }).run();
    //     console.log('filter_in', JSON.stringify(dbRespone));
    // }

    // public async order() {
    //     let dbRespone = await new Query(Alert).order('created_at', 'asc').paging(1, 20).run();
    //     console.log('order', JSON.stringify(dbRespone));
    // }

    // // grouping alert by severity, for each severity count the results
    // public async group() {
    //     let dbRespone = await new Query(Alert).group({ _id: '$severity', total: { $sum: 1 } }).run();
    //     console.log('group', JSON.stringify(dbRespone));
    // }

    // public async pluck() {
    //     let dbRespone = await new Query(Alert).filter({ '_id': '59771417d729db1d90ac7459' }).pluck('severity', 'alert_title').without('severity').run();
    //     console.log('group', JSON.stringify(dbRespone));
    // }

    // public async without() {
    //     let dbRespone = await new Query(Alert).filter({ '_id': '59771417d729db1d90ac7459' }).without('severity').run();
    //     console.log('without', JSON.stringify(dbRespone));
    // }

    // public async exists() {
    //     let dbRespone2 = await new Query(Alert).exists('case_id').paging(1, 5).run();
    //     console.log('exists', JSON.stringify(dbRespone2));
    // }

    // public async notExists() {
    //     let dbRespone2 = await new Query(Alert).notExists('case_id').paging(1, 5).run();
    //     console.log('not exists', JSON.stringify(dbRespone2));
    // }

    // public async combineNotExistWithExist() {
    //     let dbRespone2 = await new Query(Alert).notExists('case_id').exists('rules_date').paging(1, 5).run();
    //     console.log('not exists', JSON.stringify(dbRespone2));
    // }

    // public async combineExistWithNotExist() {
    //     let dbRespone2 = await new Query(Alert).exists('case_id').notExists('rules_date').paging(1, 5).run();
    //     console.log('not exists', JSON.stringify(dbRespone2));
    // }

    constructor(data?) {
        super(data, Alert);

        //this.get();
        // this.filter();
        //this.filter_in();
        //this.order();
        //this.group();
        //this.pluck();
        //this.without();
        //this.exists();
        //this.notExists();
        //this.combineNotExistWithExist();
        //this.combineExistWithNotExist();
        // this.filterByCompany();
    }
}

(async () => {
    try {




        let dbRespone = await Alert.get('59771417d729db1d90ac7459');
        console.log('get', JSON.stringify(dbRespone));
    } catch (error) {
        console.error(error);
    }
})();



 








/*

let query = new Query(Alert).filter({ '_id': '596c7de45d12be275cc0d8b7' });
getAlertBy_id();
async function getAlertBy_id() {
    let dbResponse = await get();
    console.log(dbResponse);
}

async function get() {
    return await query.run();
}
*/
