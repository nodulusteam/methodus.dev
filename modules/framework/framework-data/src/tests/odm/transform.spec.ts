
import {
     Transform, Repo,
    Model, Field, ObjectId,  Number
} from '../../';
import { DBHandler } from '../../connect';
import { truncateCollections } from '../setup';
const expect = require('chai').expect;



DBHandler.config = {
    connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'test',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }

}


@Model('Alert', Transform.Automatic, null, false)
class AlertModel extends Repo<AlertModel> {

    @ObjectId()
    @Field('id')
    public _id: string;

    @Field('_id')
    public id: string;
    
    @Field('alert.title')
    public alert_title: string;

    @Number()
    @Field('alert.count_index')
    public alert_count_index: number;

    @Number()
    @Field('alert.count')
    public alert_count: number;
}


describe('test the odm', function () {
    afterEach(async () => {
        await truncateCollections();
    });

    DBHandler.config = {
        connections: {
            default: {
                server: process.env.MONGO_URL
            },
        },
    };
    it('transform string(number) value to number', async () => {
        const count = '8';
        const data: any =
        {
            "alert.count": count,
            "alert.count_index": count,
        };
        const modelData = new AlertModel(data, AlertModel);
        const returnData = await Repo.insert<AlertModel>(modelData);
        expect(returnData['alert.count']).to.equal(+count);
        expect(returnData['alert.count_index']).to.equal(+count);
    });

    it('transform string(Text) value to number', async () => {
        const count = 'AAAA';
        const data: any =
        {
            "alert.count": count,
            "alert.count_index": count,
        };
        const modelData = new AlertModel(data, AlertModel);
        const returnData = await Repo.insert<AlertModel>(modelData);
        expect(returnData['alert.count']).to.equal(count);
        expect(returnData['alert.count_index']).to.equal(count);
    });
});

