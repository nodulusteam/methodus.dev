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
exports.Alert = void 0;
const __1 = require("../../");
let Alert = Alert_1 = class Alert extends __1.Repo {
    constructor(alert) {
        super(alert, Alert_1);
    }
};
__decorate([
    __1.ObjectId(),
    __1.Field('id'),
    __metadata("design:type", String)
], Alert.prototype, "_id", void 0);
__decorate([
    __1.Field('_id'),
    __metadata("design:type", String)
], Alert.prototype, "id", void 0);
__decorate([
    __1.Field('alert.title'),
    __metadata("design:type", String)
], Alert.prototype, "alert_title", void 0);
__decorate([
    __1.Field('created_at'),
    __metadata("design:type", Date)
], Alert.prototype, "created_at", void 0);
__decorate([
    __1.Field('_company_id'),
    __metadata("design:type", String)
], Alert.prototype, "_company_id", void 0);
__decorate([
    __1.Field('alert.count_index'),
    __metadata("design:type", Number)
], Alert.prototype, "alert_count_index", void 0);
__decorate([
    __1.Field('alert.count'),
    __metadata("design:type", Number)
], Alert.prototype, "alert_count", void 0);
__decorate([
    __1.Weight([
        { 'critical': 1 },
        { 'high': 2 },
        { 'medium': 3 },
        { 'low': 4 },
        { 'information': 5 }
    ]),
    __1.Field('severity'),
    __metadata("design:type", String)
], Alert.prototype, "severity", void 0);
Alert = Alert_1 = __decorate([
    __1.Model('Alert', __1.Transform.Automatic),
    __1.Connection('default'),
    __metadata("design:paramtypes", [Object])
], Alert);
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map