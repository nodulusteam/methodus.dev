import { expect } from 'chai';
import { Db, ObjectID } from 'mongodb';
import { truncateCollections, getConnection } from '../setup.spec';
import { Alert as AlertModel } from '../models/alert';
import { Case as CaseModel } from '../models/case';
import { Repo } from '../../repo';

import { Query, DataChange } from '../../';
const sinon = require('sinon');

describe('repo', () => {
    let connection: any;
    beforeEach(async () => {
        await truncateCollections();
        connection = await getConnection();
    });

    describe('test through model', () => {
        it('should save alert model to db', async () => {

            const alert = new AlertModel({});
            alert.id = '59e5cee88bb67a285c0454f6';
            alert.alert_title = 'my_title';

            try {
                const saveResult = await alert.save();
                expect(saveResult.id).to.be.equal(alert.id);
            } catch (ex) {
                console.error(ex);
            }

        });
        it('should get alert from db', async () => {
            const id = '59e5cee88bb67a285c0454f6';
            await connection.collection('Alert').insertOne({
                _id: new ObjectID(id),
                alert_title: 'my_title'
            });

            const alertFromDb = await AlertModel.get(id);
            expect(alertFromDb.id).to.be.equal(id);
        });

        it('should update alert in db', async () => {

             await connection.collection('Alert').insertOne({
                _id: new ObjectID('59e5cee88bb67a285c0454f6'),
                alert_title: 'my_title'
            });


            await AlertModel.update({ id: '59e5cee88bb67a285c0454f6' }, {
                'alert.title': 'updated_title',
                files: ['1']
            });


            const alertToValidate: AlertModel = await connection.collection('Alert').findOne({ _id: new ObjectID('59e5cee88bb67a285c0454f6') });
            expect(alertToValidate.alert_title).to.be.equal('updated_title');
        });



        it('should remove alert from db', async () => {

             await connection.collection('Alert').insertOne({
                _id: new ObjectID('59e5cee88bb67a285c0454f6'),
                alert_title: 'my_title'
            });

            let deletedData = await AlertModel.delete({ id: new ObjectID('59e5cee88bb67a285c0454f6') }, AlertModel, true);

            expect(deletedData.result.ok).to.be.equal(1);
        });



    });
});