"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mongodb_1 = require("mongodb");
const setup_spec_1 = require("../setup.spec");
const alert_1 = require("../models/alert");
const sinon = require('sinon');
describe('repo', () => {
    let connection;
    beforeEach(async () => {
        await setup_spec_1.truncateCollections();
        connection = await setup_spec_1.getConnection();
    });
    describe('test through model', () => {
        it('should save alert model to db', async () => {
            const alert = new alert_1.Alert({});
            alert.id = '59e5cee88bb67a285c0454f6';
            alert.alert_title = 'my_title';
            try {
                const saveResult = await alert.save();
                chai_1.expect(saveResult.id).to.be.equal(alert.id);
            }
            catch (ex) {
                console.error(ex);
            }
        });
        it('should get alert from db', async () => {
            const id = '59e5cee88bb67a285c0454f6';
            await connection.collection('Alert').insertOne({
                _id: new mongodb_1.ObjectID(id),
                alert_title: 'my_title'
            });
            const alertFromDb = await alert_1.Alert.get(id);
            chai_1.expect(alertFromDb.id).to.be.equal(id);
        });
        it('should update alert in db', async () => {
            await connection.collection('Alert').insertOne({
                _id: new mongodb_1.ObjectID('59e5cee88bb67a285c0454f6'),
                alert_title: 'my_title'
            });
            await alert_1.Alert.update({ id: '59e5cee88bb67a285c0454f6' }, {
                'alert.title': 'updated_title',
                files: ['1']
            });
            const alertToValidate = await connection.collection('Alert').findOne({ _id: new mongodb_1.ObjectID('59e5cee88bb67a285c0454f6') });
            chai_1.expect(alertToValidate.alert_title).to.be.equal('updated_title');
        });
        it('should remove alert from db', async () => {
            await connection.collection('Alert').insertOne({
                _id: new mongodb_1.ObjectID('59e5cee88bb67a285c0454f6'),
                alert_title: 'my_title'
            });
            let deletedData = await alert_1.Alert.delete({ id: new mongodb_1.ObjectID('59e5cee88bb67a285c0454f6') }, alert_1.Alert, true);
            chai_1.expect(deletedData.result.ok).to.be.equal(1);
        });
    });
});
//# sourceMappingURL=crud.spec.js.map