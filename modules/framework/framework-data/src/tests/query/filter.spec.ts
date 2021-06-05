import { Alert } from '../models';
import { Query, FilterServerUtility, DBHandler } from '../../';
import { getConnection, truncateCollections } from '../setup';
const expect = require('chai').expect;
import { ObjectID } from 'mongodb';
import { ReturnType } from '../../enums/return_type';
describe('pluck', () => {
    afterEach(async () => {
        await truncateCollections();
    });
    beforeEach(async () => {
        await truncateCollections();
    });
    DBHandler.config = {
        connections: {
            default: {
                server: process.env.MONGO_URL,
            },
        },
    };

    it('filterserverutility test', async () => {
        const _id: any = new ObjectID();
        const fUtility: FilterServerUtility = new FilterServerUtility(Alert);
        let predicate = new Query(Alert);

        await Alert.insert({
            _id,
            alert_title: 'my_title',
        });

        const query = {
            filters: { alert_title: 'my_title' },
        };
        if (query.filters) {
            const utilityFilters = fUtility.build(query.filters);
            if (utilityFilters && Object.keys(utilityFilters).length > 0) {
                predicate = predicate.filter(utilityFilters);
            }
        }

        const result: any = await predicate.run(ReturnType.Single);
        expect(result['alert.title']).to.equal('my_title');
    });

    it('filterserverutility array test', async () => {
        const _id: any = new ObjectID();
        const fUtility: FilterServerUtility = new FilterServerUtility(Alert);
        let predicate = new Query(Alert);

        await Alert.insert({
            id: _id,
            alert_title: 'my_title',
        });

        const query = {
            filters: [{ filter_by: 'alert_title', order_by: 'alert_title' }],
        };
        if (query.filters) {
            const utilityFilters = fUtility.build(query.filters, { alert_title: 'my_title' });
            if (utilityFilters && Object.keys(utilityFilters).length > 0) {
                predicate = predicate.filter(utilityFilters);
            }
        }
        const result: any = await predicate.run(ReturnType.Single);

        expect(result['alert.title']).to.equal('my_title');
    });
});
