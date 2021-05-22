import { expect } from 'chai';
import { ObjectID } from 'mongodb';
import { truncateCollections } from '../setup';
import { Alert } from '../models/alert';

import { DBHandler } from '../../';
import { ReturnType } from '../../enums';

describe('repo', () => {
    afterEach(async () => {
        await truncateCollections();
    });

    DBHandler.config = {
        connections: {
            default: {
                server: process.env.MONGO_URL,
            },
        },
    };

    describe('test through model', () => {
        it('should save alert model to db', async () => {
            const alert = new Alert({});
            alert.id = '59e5cee88bb67a285c0454f6';
            alert.alert_title = 'my_title';

            const saveResult = await alert.save();
            expect(saveResult.id.toString()).to.be.equal(alert.id.toString());
        });
        it('should get alert from db', async () => {
            const id = new ObjectID();
            await Alert.insert({
                id: new ObjectID(id),
                alert_title: 'my_title',
            });

            const alertFromDb = await Alert.get(id.toHexString());
            expect(alertFromDb.id).to.be.equal(id.toHexString());
        });

        xit('should update alert in db', async () => {
            const id = new ObjectID();

            console.log(
                await Alert.insert({
                    id: id,
                    alert_title: 'my_title',
                })
            );

            console.log(
                await Alert.update(
                    { id: id },
                    {
                        'alert.title': 'updated_title',
                        files: ['1'],
                    }
                )
            );
            const alertToValidate: Alert = await Alert.find({ _id: id }, ReturnType.Single);
            expect(alertToValidate.alert_title).to.be.equal('updated_title');
        });

        it('should remove alert from db', async () => {
            await Alert.insert({
                _id: new ObjectID('59e5cee88bb67a285c0454f6'),
                alert_title: 'my_title',
            });

            let deletedData = await Alert.delete({ id: new ObjectID('59e5cee88bb67a285c0454f6') }, Alert, true);

            expect(deletedData.result.ok).to.be.equal(1);
        });
    });
});
