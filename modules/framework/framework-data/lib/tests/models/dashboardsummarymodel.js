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
var DashboardSummaryModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSummaryModel = void 0;
const __1 = require("../../");
let DashboardSummaryModel = DashboardSummaryModel_1 = class DashboardSummaryModel extends __1.Repo {
    constructor(dashboardSummaryModel) {
        super(dashboardSummaryModel, DashboardSummaryModel_1);
    }
};
__decorate([
    __1.ObjectId(),
    __1.Field('_id'),
    __metadata("design:type", String)
], DashboardSummaryModel.prototype, "_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], DashboardSummaryModel.prototype, "_company_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Object)
], DashboardSummaryModel.prototype, "_devices", void 0);
DashboardSummaryModel = DashboardSummaryModel_1 = __decorate([
    __1.Model('DashboardSummary', __1.Transform.Automatic),
    __metadata("design:paramtypes", [DashboardSummaryModel])
], DashboardSummaryModel);
exports.DashboardSummaryModel = DashboardSummaryModel;
//# sourceMappingURL=dashboardsummarymodel.js.map