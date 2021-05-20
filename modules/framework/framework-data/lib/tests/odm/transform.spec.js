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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const connect_1 = require("../../connect");
const expect = require('chai').expect;
connect_1.DBHandler.config = {
    connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'test',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }
};
let AlertModel = class AlertModel extends __1.Repo {
};
__decorate([
    __1.ObjectId(),
    __1.Field('id'),
    __metadata("design:type", String)
], AlertModel.prototype, "_id", void 0);
__decorate([
    __1.Field('_id'),
    __metadata("design:type", String)
], AlertModel.prototype, "id", void 0);
__decorate([
    __1.Field('alert.title'),
    __metadata("design:type", String)
], AlertModel.prototype, "alert_title", void 0);
__decorate([
    __1.Number(),
    __1.Field('alert.count_index'),
    __metadata("design:type", Number)
], AlertModel.prototype, "alert_count_index", void 0);
__decorate([
    __1.Number(),
    __1.Field('alert.count'),
    __metadata("design:type", Number)
], AlertModel.prototype, "alert_count", void 0);
AlertModel = __decorate([
    __1.Model('Alert', __1.Transform.Automatic, null, false)
], AlertModel);
describe('test the odm', function () {
    it('transform string(number) value to number', async () => {
        const count = '8';
        const data = {
            "alert.count": count,
            "alert.count_index": count,
        };
        const modelData = new AlertModel(data, AlertModel);
        const returnData = await __1.Repo.insert(modelData);
        expect(returnData['alert.count']).to.equal(+count);
        expect(returnData['alert.count_index']).to.equal(+count);
    });
    it('transform string(Text) value to number', async () => {
        const count = 'AAAA';
        const data = {
            "alert.count": count,
            "alert.count_index": count,
        };
        const modelData = new AlertModel(data, AlertModel);
        const returnData = await __1.Repo.insert(modelData);
        expect(returnData['alert.count']).to.equal(count);
        expect(returnData['alert.count_index']).to.equal(count);
    });
});
//# sourceMappingURL=transform.spec.js.map