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
var InjestedAlert_1;
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
const query_1 = require("../../query");
const decorators_1 = require("../../decorators");
const repo_1 = require("../../repo");
process.env.TEST = 'true';
process.env.NODE_ENV = 'debug';
process.env.NODE_CONFIG_ENV = 'local';
process.env.NODE_LOG_DIR = './logs';
let InjestedAlert = InjestedAlert_1 = class InjestedAlert extends repo_1.Repo {
    constructor(data) {
        super(data, InjestedAlert_1);
    }
};
__decorate([
    decorators_1.ObjectId(),
    decorators_1.Field(),
    __metadata("design:type", String)
], InjestedAlert.prototype, "_id", void 0);
InjestedAlert = InjestedAlert_1 = __decorate([
    decorators_1.Model('InjestedAlert'),
    __metadata("design:paramtypes", [Object])
], InjestedAlert);
let Alert = class Alert extends InjestedAlert {
    constructor(data) {
        super(data);
    }
};
__decorate([
    decorators_1.ObjectId(),
    decorators_1.Field(),
    __metadata("design:type", String)
], Alert.prototype, "alert_id", void 0);
Alert = __decorate([
    decorators_1.Model('Alert'),
    __metadata("design:paramtypes", [Object])
], Alert);
describe('test the odm', function () {
    it('filter using ObjectID', function () {
        process.env.TEST = 'true';
        process.env.NODE_ENV = 'debug';
        process.env.NODE_CONFIG_ENV = 'local';
        process.env.NODE_LOG_DIR = './logs';
        const query = new query_1.Query(Alert).filter({ '_id': '596e16f5bfdc9dbe27c41398' });
        const matchObject = JSON.stringify([{ '$match': { '$and': [{ '_id': '596e16f5bfdc9dbe27c41398' }] } }]);
        expect(JSON.stringify(query.toQuery())).to.equal(matchObject);
    });
});
//# sourceMappingURL=inherit.spec.js.map