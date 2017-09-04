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
const index_1 = require("../../index");
const endPoint = 'http://127.0.0.1:8090'; //https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
let EventsClass = class EventsClass {
    constructor() { }
    evenHandler(item) {
        console.log('in event handler', item);
        return item;
    }
    evenHandler1(item) {
        console.log('in event handler', item);
        return item;
    }
};
__decorate([
    index_1.Log(),
    index_1.Event('PreEvent', index_1.Verbs.Get, '/posts/event'),
    index_1.Event('FirstClassEvent', index_1.Verbs.Get, '/posts/event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsClass.prototype, "evenHandler", null);
__decorate([
    index_1.Log(),
    index_1.Event('SecondClassEvent', index_1.Verbs.Get, '/posts/event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsClass.prototype, "evenHandler1", null);
EventsClass = __decorate([
    index_1.LogClass(index_1.logger),
    index_1.MethodConfig('EventsClass', endPoint),
    __metadata("design:paramtypes", [])
], EventsClass);
exports.EventsClass = EventsClass;
//# sourceMappingURL=events-class.js.map