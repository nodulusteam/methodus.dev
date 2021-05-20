"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Alert_1;
Object.defineProperty(exports, "__esModule", { value: true });
// tests/config.js
const path = require('path');
var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
const repo_1 = require("../../repo");
const decorators_1 = require("../../decorators");
const enums_1 = require("../../enums");
process.env.TEST = 'true';
process.env.NODE_ENV = 'debug';
process.env.NODE_CONFIG_ENV = 'local';
process.env.NODE_LOG_DIR = './logs';
//
let Alert = Alert_1 = class Alert extends repo_1.Repo {
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
    constructor(data) {
        super(data, Alert_1);
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
};
__decorate([
    decorators_1.ObjectId(),
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "_id", void 0);
__decorate([
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "alert_title", void 0);
__decorate([
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "created_at", void 0);
__decorate([
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "severity", void 0);
__decorate([
    decorators_1.Lookup('@tmla-contracts/user', 'User', 'byId', 'created_by', 'username'),
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "created_by_name", void 0);
Alert = Alert_1 = __decorate([
    decorators_1.Model('Alert', enums_1.Transform.Automatic),
    decorators_1.Connection('alert'),
    __metadata("design:paramtypes", [Object])
], Alert);
(async () => {
    try {
        let dbRespone = await Alert.get('59771417d729db1d90ac7459');
        console.log('get', JSON.stringify(dbRespone));
    }
    catch (error) {
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
//# sourceMappingURL=query.js.map