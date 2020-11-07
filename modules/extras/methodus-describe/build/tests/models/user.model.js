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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const data_1 = require("@methodus/data");
let UserModel = class UserModel {
    constructor(data) {
        this.Email = data.Email;
    }
    validate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_1.Validator.validate(item);
            if (result.length > 0) {
                const constraints = result.map((item2) => {
                    return Object.values(item2.constraints).join(';');
                });
                return constraints.join(';');
            }
            return false;
        });
    }
};
__decorate([
    data_1.Validator.IsNotEmpty(),
    data_1.Validator.IsEmail({}, {
        message: "Title is too short"
    }),
    data_1.Field(),
    __metadata("design:type", String)
], UserModel.prototype, "Email", void 0);
UserModel = __decorate([
    data_1.Model('UserModel'),
    __metadata("design:paramtypes", [Object])
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map