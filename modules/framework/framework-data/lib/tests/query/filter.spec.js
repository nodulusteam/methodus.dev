"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const __1 = require("../../");
const setup_spec_1 = require("../setup.spec");
const expect = require('chai').expect;
const mongodb_1 = require("mongodb");
const return_type_1 = require("../../enums/return_type");
describe('pluck', () => {
    it('filterserverutility test', async () => {
        const conn = await setup_spec_1.getConnection();
        const _id = new mongodb_1.ObjectID();
        const fUtility = new __1.FilterServerUtility(models_1.Alert);
        let predicate = new __1.Query(models_1.Alert);
        await conn.collection('Alert').insertOne({
            _id,
            alert_title: 'my_title'
        });
        const query = {
            filters: { alert_title: 'my_title' }
        };
        if (query.filters) {
            const utilityFilters = fUtility.build(query.filters);
            if (utilityFilters && Object.keys(utilityFilters).length > 0) {
                predicate = predicate.filter(utilityFilters);
            }
        }
        const result = await predicate.run(return_type_1.ReturnType.Single);
        expect(result['alert.title']).to.equal('my_title');
    });
    it('filterserverutility array test', async () => {
        const conn = await setup_spec_1.getConnection();
        const _id = new mongodb_1.ObjectID();
        const fUtility = new __1.FilterServerUtility(models_1.Alert);
        let predicate = new __1.Query(models_1.Alert);
        await conn.collection('Alert').insertOne({
            _id,
            alert_title: 'my_title'
        });
        const query = {
            filters: [{ filter_by: 'alert_title', order_by: 'alert_title' }]
        };
        if (query.filters) {
            const utilityFilters = fUtility.build(query.filters, { alert_title: 'my_title' });
            if (utilityFilters && Object.keys(utilityFilters).length > 0) {
                predicate = predicate.filter(utilityFilters);
            }
        }
        const result = await predicate.run(return_type_1.ReturnType.Single);
        expect(result['alert.title']).to.equal('my_title');
    });
});
//# sourceMappingURL=filter.spec.js.map