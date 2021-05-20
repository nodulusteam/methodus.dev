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
var Company_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const __1 = require("../../");
let Company = Company_1 = class Company extends __1.Repo {
    constructor(data) {
        super(data, Company_1);
    }
};
__decorate([
    __1.Field('id'),
    __metadata("design:type", String)
], Company.prototype, "_id", void 0);
__decorate([
    __1.Field('_id'),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Company.prototype, "created_by", void 0);
Company = Company_1 = __decorate([
    __1.Model('Company', __1.Transform.Automatic),
    __metadata("design:paramtypes", [Object])
], Company);
exports.Company = Company;
//# sourceMappingURL=company.js.map