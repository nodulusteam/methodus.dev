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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const __1 = require("../../");
let User = User_1 = class User extends __1.Repo {
    constructor(data) {
        super(data, User_1);
    }
    ;
};
__decorate([
    __1.ObjectId(),
    __1.Field('_id'),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    __1.Field('username'),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    __1.Field('first_name'),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    __1.Field('last_name'),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    __1.Field('last_login_date'),
    __metadata("design:type", Date)
], User.prototype, "last_login_date", void 0);
__decorate([
    __1.Field('primary_phone'),
    __metadata("design:type", String)
], User.prototype, "primary_phone", void 0);
__decorate([
    __1.Field('created_at'),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    __1.Field('company_id'),
    __metadata("design:type", String)
], User.prototype, "company_id", void 0);
__decorate([
    __1.Field('created_by'),
    __metadata("design:type", String)
], User.prototype, "created_by", void 0);
__decorate([
    __1.Field('role_id'),
    __metadata("design:type", String)
], User.prototype, "role_id", void 0);
__decorate([
    __1.Field('email'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    __1.Field('attUID'),
    __metadata("design:type", String)
], User.prototype, "attUID", void 0);
__decorate([
    __1.Field('_company_id'),
    __metadata("design:type", String)
], User.prototype, "_company_id", void 0);
__decorate([
    __1.Field('id_old'),
    __metadata("design:type", String)
], User.prototype, "id_old", void 0);
User = User_1 = __decorate([
    __1.Model('User'),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.js.map