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
var Temp_1, UserRole_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Temp = void 0;
require("reflect-metadata");
const alert_1 = require("../models/alert");
const chai_1 = require("chai");
const mongodb_1 = require("mongodb");
const __1 = require("../../");
const connect_1 = require("../../connect");
const decorators_1 = require("../../decorators");
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
let Temp = Temp_1 = class Temp extends __1.Repo {
    constructor(data) {
        super(data, Temp_1);
    }
};
__decorate([
    __1.ObjectId(),
    __1.Field('id'),
    __metadata("design:type", String)
], Temp.prototype, "_id", void 0);
__decorate([
    __1.IsoDate(),
    __1.Field(),
    __metadata("design:type", Date)
], Temp.prototype, "created_at", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Temp.prototype, "name", void 0);
Temp = Temp_1 = __decorate([
    decorators_1.ModelInMemory('Temp'),
    __metadata("design:paramtypes", [Object])
], Temp);
exports.Temp = Temp;
let UserRole = UserRole_1 = class UserRole extends __1.Repo {
    constructor(data) {
        super(data, UserRole_1);
        this.temp = new Temp({
            name: 'ron test',
            created_at: new Date()
        });
    }
};
__decorate([
    __1.ObjectId(),
    __1.Field('id'),
    __metadata("design:type", String)
], UserRole.prototype, "_id", void 0);
__decorate([
    __1.IsoDate(),
    __1.Field(),
    __metadata("design:type", Date)
], UserRole.prototype, "created_at", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "created_by", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "role", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "level", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "name", void 0);
__decorate([
    __1.Number(null, 'double'),
    __1.Field(),
    __metadata("design:type", Number)
], UserRole.prototype, "order", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Temp)
], UserRole.prototype, "temp", void 0);
UserRole = UserRole_1 = __decorate([
    __1.Model('UserRole'),
    __metadata("design:paramtypes", [Object])
], UserRole);
exports.UserRole = UserRole;
describe('odm', () => {
    let alert;
    beforeEach(() => {
        alert = new alert_1.Alert();
    });
    it('schema field validator full data', async () => {
        const role = new UserRole({
            name: 'test',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.insert();
        chai_1.expect(result.order).to.be.equal(role.order);
    });
    it('insert with generic type', async () => {
        const role = new UserRole({
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.insert();
        // const result: UserRole = await Repo.insert<UserRole>(role);
        chai_1.expect(result.order).to.be.equal(role.order);
    });
    it('save with generic type', async () => {
        const role = new UserRole({
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.save();
        // const result: UserRole = await Repo.insert<UserRole>(role);
        chai_1.expect(result.order).to.be.equal(role.order);
    });
    it('get static with T', async () => {
        const role = new UserRole({
            _id: new mongodb_1.ObjectID(),
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.save();
        const getRole = await UserRole.get(result._id.toString());
        const getRole2 = await UserRole.get(result._id.toString());
        // const result: UserRole = await Repo.insert<UserRole>(role);
        chai_1.expect(result.order).to.be.equal(role.order);
        chai_1.expect(getRole.order).to.be.equal(role.order);
        chai_1.expect(getRole2.order).to.be.equal(role.order);
    });
    /*
        it('schema field validator partial data', async () => {
            const role = new UserRole({
                name: 'test',
                created_at: new Date(),
            });
            const result: any = await role.insert();
            expect(result.order).to.be.equal(role.order);
        });
    
        it('should create metadata for model using decorators', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.collectionName).to.be.equal('Alert');
        })
    
        it('should add collection name to model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.collectionName).to.be.equal('Alert');
        });
    
        it('should add id field for model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(typeof metadata.fields['_id']).to.be.equal('object');
        });
    
        it('should add id field details for model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.fields['_id'].displayName).to.be.equal('id');
            expect(metadata.fields['_id'].propertyKey).to.be.equal('_id');
        });
    
        describe('transform', () => {
    
            it('should transform in, replace id to _id', () => {
                let _id = new ObjectID().toString();
                alert.id = _id
                alert._id = 'danny';
    
                const odm: ODM = Reflect.getMetadata('odm', Alert);
    
                delete alert['modelType'];
                const transformedAlert = Odm.transform<Alert>(odm, alert, TransformDirection.IN);
    
    
                expect(transformedAlert._id.toString()).to.be.equal(_id);
                expect(transformedAlert.id).to.be.equal('danny');
            });
            //it('should transform out, replace _id to id');
        });
    
        describe('trying to get odm', () => {
    
            it('should get odm for userrole', () => {
                let odm: ODM = Reflect.getMetadata('odm', UserRole);
                expect(Object.keys(odm.fields).length).to.be.equal(7);
            });
    
            it('should get odm for weight', () => {
                let odm: ODM = Reflect.getMetadata('odm', Alert);
                expect(Object.keys(odm.fields.severity.fieldDetails.value).length).to.be.equal(5);
            });
        });*/
});
//# sourceMappingURL=odm.spec.js.map