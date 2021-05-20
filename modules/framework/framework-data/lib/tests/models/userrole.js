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
var UserRole_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const __1 = require("../../");
let UserRole = UserRole_1 = class UserRole extends __1.Repo {
    constructor(data) {
        super(data, UserRole_1);
    }
    ;
};
__decorate([
    __1.ObjectId(),
    __1.Field('_id'),
    __metadata("design:type", String)
], UserRole.prototype, "_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Date)
], UserRole.prototype, "created_at", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "created_by", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "level", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Number)
], UserRole.prototype, "order", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], UserRole.prototype, "role", void 0);
UserRole = UserRole_1 = __decorate([
    __1.Model('UserRole'),
    __metadata("design:paramtypes", [Object])
], UserRole);
exports.UserRole = UserRole;
//# sourceMappingURL=userrole.js.map