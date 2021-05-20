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
var Case_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const __1 = require("../../");
let Case = Case_1 = class Case extends __1.Repo {
    constructor(_case) {
        super(_case, Case_1);
    }
};
__decorate([
    __1.ObjectId(),
    __1.Field('_id'),
    __metadata("design:type", String)
], Case.prototype, "_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "_company_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "aggregation_key", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "case_type", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "company_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "compliance_items", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Date)
], Case.prototype, "created_at", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "created_by", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "created_by_name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "description", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Date)
], Case.prototype, "edited_at", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "editor_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "editor_name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Boolean)
], Case.prototype, "escalate_case", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Object)
], Case.prototype, "escalation_details", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Boolean)
], Case.prototype, "is_att_threat_intelect", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Boolean)
], Case.prototype, "new_comment", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "recommendation", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "resolution_note", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "severity", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "status", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "status_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "title", void 0);
__decorate([
    __1.ObjectId(),
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "viewer_id", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Number)
], Case.prototype, "views", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "company_name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "viewer_name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", String)
], Case.prototype, "status_name", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Date)
], Case.prototype, "closed_at", void 0);
__decorate([
    __1.Field(),
    __metadata("design:type", Object)
], Case.prototype, "files", void 0);
Case = Case_1 = __decorate([
    __1.Model('Case', __1.Transform.Automatic),
    __1.Connection('default'),
    __metadata("design:paramtypes", [Object])
], Case);
exports.Case = Case;
//# sourceMappingURL=case.js.map