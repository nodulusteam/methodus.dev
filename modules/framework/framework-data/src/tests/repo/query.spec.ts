// tests/config.js
import { Repo, Query, ReturnType, DBHandler } from '../../';
import { Alert, Company, User } from '../models/index';
import { getConnection, truncateCollections } from '../setup';
import * as _ from 'lodash';
import * as faker from 'faker';

const chai = require('chai');
const expect = chai.expect; // we are using the 'expect' style of Chai

import { ObjectID } from 'mongodb';

function getAlerts() {
    return [
        {
            _company_id: 'HAS',
            created_at: new Date('11-12-17'),
            severity: 'information',
            rules_date: true,
            case_id: '111621020',
        },
        {
            _company_id: 'HAS',
            created_at: new Date('11-10-17'),
            severity: 'low',
            case_id: '22388',
        },
        {
            _company_id: 'POC',
            created_at: new Date('15-09-17'),
            severity: 'information',
            rules_date: false,
        },
        {
            _company_id: 'HAS',
            created_at: new Date('18-07-17'),
            severity: 'low',
            rules_date: true,
        },
        {
            _company_id: 'POC',
            created_at: new Date('03-11-17'),
            severity: 'critical',
            case_id: '111621020',
            rules_date: true,
        },
    ];
}

async function insertAlert(key = '') {
    const fullKey = new ObjectID(key).toString();

    await Alert.insert({
        id: new ObjectID(key),
        _company_id: 'HAS',
        created_at: new Date(),
        severity: 'low',
    });
    return fullKey;
}

DBHandler.config = {
    connections: {
        default: {
            server: process.env.MONGO_URL,
        },
    },
};

describe('create a simple query to access mongo collection', () => {
    afterEach(async () => {
        await truncateCollections();
    });
    beforeEach(async () => {
        await truncateCollections();
    });

    it('get document by primary key', async () => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let result: Alert = await Alert.get(key);
        expect(result.id.toString()).to.equal(key);
    });

    it('filter by id to be an object', async (done) => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let predicate = new Query(Alert).filter({ id: key });
        let result = await predicate.run(ReturnType.Single);
        expect(result).to.be.a('object');
        done();
    });

    it('filter by id to be an array', async () => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let predicate = new Query(Alert).filter({
            _id: key,
        });
        let result = await predicate.run();
        expect(result).to.be.a('array');
    });
});

describe('create a simple query to access mongo collection', () => {
    afterEach(async () => {
        await truncateCollections();
    });
    beforeEach(async () => {
        await truncateCollections();
    });

    it('filter by _company_id,paging count 3 results', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).filter({ _company_id: 'HAS' }).paging(1, 5);
        let result = await Alert.query(query);
        expect(result.results.length).to.equal(3);
    });

    it('paging count 5 results', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).order('created_at', 'asc').paging(1, 5);
        let result = await Alert.query(query);
        expect(result.results.length).to.equal(5);
    });

    it('group results by severity(low,critical,information,medium,high)', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).group({
            _id: '$severity',
            total: { $sum: 1 },
        });
        let result = await Repo.query(query);
        expect(result.filter((alert: any) => alert.id === 'low').pop().total).to.be.equal(2);
    });

    it('filter,pluck,without', async () => {
        const alerts = [
            {
                _company_id: 'HAS',
                created_at: new Date('11-12-17'),
                severity: 'high',
                name: 'test1',
            },
            {
                _company_id: 'HAS',
                created_at: new Date('11-10-17'),
                severity: 'low',
                name: 'test2',
            },
        ];

        await Alert.insert(alerts);
        let query = new Query(Alert)
            .filter({ created_at: new Date('11-10-17') })
            .pluck('severity', 'created_at')
            .without('name');
        let result = await Repo.query(query);
        expect(result.length).to.equal(1);
        expect(result[0].hasOwnProperty('severity')).to.equal(true);
        expect(result[0].hasOwnProperty('created_at')).to.equal(true);
        expect(result[0].hasOwnProperty('name')).to.equal(false);
    });

    it('merge', async () => {
        await Promise.all([
            Company.insert([
                { _id: 'Maxim', id: 'Maxim' },
                { _id: 'POC', id: 'POC' },
            ]),
            User.insert([
                {
                    id: 'some id',
                    name: 'Orel',
                    company_id: 'Maxim',
                    _companies: [{ id: 'HAS' }, { id: 'POC' }],
                },
                {
                    id: 'some id1',
                    name: 'Ron',
                    company_id: 'POC',
                    _companies: [{ id: 'HAS' }, { id: 'Maxim' }],
                },
                {
                    id: 'some id1',
                    name: 'Pablo',
                    company_id: 'POC',
                    _companies: [{ id: 'HAS' }, { id: 'FAKE' }],
                },
                {
                    id: 'some id2',
                    name: 'Moshe',
                    company_id: 'Maxim',
                    _companies: [{ id: 'HAS' }, { id: 'FAKE' }],
                },
            ]),
        ]);

        let query = new Query(Company)
            .filter({ id: 'Maxim' })
            .merge('User', '_id', 'company_id', 'users') // $lookup => join user.company_id = company._id
            .merge('User', 'id', '_companies.id', 'users_addition')
            .addFields([{ irit: '$users_addition' }]);

        let result = await Repo.query(query);
        expect(result.length).to.equal(1);
        expect(result[0].users.length).to.equal(2);
        expect(result[0].users.filter((user: any) => user.name === 'Pablo').length).to.equal(0);
        expect(result[0].users_addition.length).to.equal(1);
        expect(result[0].users_addition[0].name).to.equal('Ron');
    });

    it('exists', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).filter({ severity: 'critical' }).exists('case_id').paging(1, 5);
        let result = await Repo.query(query);
        expect(result.results.length).to.equal(1);
    });

    it('not exists', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).filter({ severity: 'information' }).notExists('case_id').paging(1, 2);
        let result = await Repo.query(query);
        expect(result.results.length).to.equal(1);
    });

    it('combineNotExistWithExist', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).notExists('case_id').exists('rules_date');
        let result = await Repo.query(query);
        expect(result.length).to.equal(2);
    });

    it('between', async () => {
        const alerts = getAlerts();
        const connection: any = await getConnection();
        await Alert.insert(alerts);
        const query = new Query(Alert)
            .between('_id', '100020011', '100030011')
            .and({
                severity: 'critical',
            })
            .or({
                severity: 'medium',
            })
            .paging(1, 5);
        const result = await Repo.query(query);
        expect(result.results.length).to.equal(0);
    });

    it('combineExistWithNotExist', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).exists('case_id').notExists('rules_date').paging(1, 5);
        let result = await Repo.query(query);
        expect(result.results.length).to.equal(1);
    });

    it('filter by _company_id, count check', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);

        let query = new Query(Alert).filter({ case_id: '111621020' }).count('total_alerts');
        let result = await Alert.query(query, ReturnType.Single);
        expect(result.total_alerts).to.equal(2);
    });

    it('filter by _company_id, limit check', async () => {
        const alerts = getAlerts();
        await Alert.insert(alerts);
        let query = new Query(Alert).filter({ case_id: '111621020' }).limit(2);
        let result = await Repo.query(query);
        expect(result.length).to.equal(2);
    });

    it('empty filter check', async () => {
        const alerts = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }];
        await Alert.insert(alerts);
        let query = new Query(Alert).filter({}).limit(4);
        let result = await Repo.query(query);
        expect(result.length).to.equal(result.length);
    });
});
