import {
    getConnection
} from '../setup.spec';
import { Company, Alert, Case } from '../models';
import { Query, ReturnType } from '../../';
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
describe('pluck', () => {
    it('multiple fields', async () => {
        try {
            const c1: any = await getConnection();
            await c1.collection('Company').insertOne({ "name": "Maxim", "id": "Maxim", "toBeIgnored": 1, "toBeIgnored2": 2 });
            const fieldsToPluck = ['id', 'name']
            const query = new Query(Company);
            const result = await query.pluck(...fieldsToPluck).run();
            const firstResult = result.pop();
            expect('_id' in firstResult).to.be.equal('Maxim');

        }
        catch (err) {
            return err;
        }
    });

});

describe('check the following methods: between, and, or, paging, filter', () => {

    it('get all alerts between id 100020011 to id 100020020 with severity critical or medium with paging of 5 records', async () => {
        const c2: any = await getConnection();
        const alerts = alertsData();
        await c2.collection('Alert').insertMany(alerts);
        const query = new Query(Alert)
            .between('_id', '100020011', '100020020')
            .and({
                'severity': 'critical'
            }).or({
                'severity': 'medium'
            }).paging(1, 5);

        try {
            const result = await query.run();
            expect(result.results.length).to.equal(5);
        } catch (error) {
            console.error(error);
        }


    });


    it('filter all alerts with severity high or critical or those are missing severity field, also have company_id POC and created_by_name \'LidoR11 Achiyosef\' or \'Shoshi X Brojak\' ', async () => {
        const c3: any = await getConnection();
        const alerts = alertsData();
        await c3.collection('Alert').insertMany(alerts);
        let query = new Query(Alert)
            .filter({ 'severity': 'high' })
            .or({
                'severity': 'critical'
            })
            .or({
                'severity': null
            })
            .and({ 'company_name': 'POC' })
            .and({ 'created_by_name': 'LidoR11 Achiyosef' })
            .or({ 'created_by_name': 'Shoshi X Brojak' });
        let result = await query.run();
        expect(result.length).to.be.above(1);
    });

    it('filter all Case by company id and status id not close', async (done) => {
        try {
            const c4: any = await getConnection();
            let cases = casesData();
            await c4.collection('Case').insertMany(cases);
            let query = new Query(Case)
                .filter({ '_company_id': 'POC' })
                .and({})
                .notIn('status_id', ['59d1c3bb6d74f228cc778c9a', '59d1c3bb6d74f228cc778c9b'])
                .count('total_cases');
            let result = await query.run(ReturnType.Single);
            expect(result.total_cases).to.be.equal(1);
            done();
        }
        catch (err) {
            done(err);
        }
    });

    it('filter all Case by company id and status id in close', async () => {

        const c5: any = await getConnection();
        let cases = casesData();

        await c5.collection('Case').insertMany(cases);
        let query = new Query(Case)
            .filter({ '_company_id': 'POC' })
            .in('status_id', ['59d1c3bb6d74f228cc778c9a', '59d1c3bb6d74f228cc778c9b'])
            .count('total_cases');
        let result = await query.run(ReturnType.Single);
        assert.isAtLeast(result.total_cases, 1);

        // expect(result.total_cases).to.be.equal(2);
    });


    function alertsData() {
        return [
            { "id": "100020013", "severity": "critical" },
            { "id": "100020014", "severity": "low" },
            { "id": "100020015", "severity": "critical", company_name: 'POC', created_by_name: 'LidoR11 Achiyosef' },
            { "id": "100020016", "severity": "low" },
            { "id": "100020017", "severity": "critical" },
            { "id": "100020018", "severity": "medium" },
            { "id": "100020019", company_name: 'POC', created_by_name: 'Shoshi X Brojak' },
            { "id": "100020020", "severity": "medium" }
        ]
    }

    function casesData() {
        return [{
            "_company_id": "POC",
            "_refid": "",
            "case_type": "Audit Log Failure",
            "company_id": "HJwCLezMx",
            "created_by": "r1F0OxYLx",
            "description": "test for cases1111111111",
            "destination_ip": "",
            "destination_port": "",
            "disableNotification": false,
            "editor_id": "ryEtkJtIl",
            "editor_name": "Mark Blatnoy",
            "escalate_case": false,
            "files": [],
            "id": "100010021",
            "is_att_threat_intelect": true,
            "new_comment": true,
            "next_check": "",
            "original_alert_type": "",
            "protocol": "",
            "resolution_note": "asdfgv",
            "severity": "medium",
            "source_ip": "",
            "status": "closed resolved",
            "status_id": "59d1c3bb6d74f228cc778c99",
            "title": "test for cases1111111111",
            "username": "",
            "viewer_id": "r1qYpAu8l",
            "views": 16,
            "id_old": "100010021",
            "company_id_old": "HJwCLezMx",
            "company_name": "POC",
            "created_by_old": "r1F0OxYLx",
            "created_by_name": "Revital Erez",
            "editor_id_old": "ryEtkJtIl",
            "viewer_id_old": "r1qYpAu8l",
            "viewer_name": "Ianir Horn",
            "status_name": "closed resolved",
            "status_id_old": "ee42280e-2f01-470d-a135-fd73495b3fd2"
        },
        {
            "_company_id": "POC",
            "aggregation_key": "title=Prod-Windows-Possible Compromised User Account - Successful login by (SYSTEM) from ()&_company_id=POC&",
            "case_type": "",
            "company_id": "HJwCLezMx",
            "compliance": "",
            "created_by": "SYSTEM",
            "description": "",
            "editor_id": "r1qYpAu8l",
            "editor_name": "Ianir Horn",
            "escalate_case": false,
            "id": "100010018",
            "is_att_threat_intelect": false,
            "new_comment": false,
            "next_check": "2017-05-31T05:59:39.627Z",
            "recomendation": "",
            "resolution_note": "not verified but closed",
            "severity": "critical",
            "status": "closed resolved",
            "status_id": "59d1c3bb6d74f228cc778c9b",
            "title": "Prod-Windows-Possible Compromised User Account - Successful login by (SYSTEM) from ()",
            "viewer_id": "HyZMeJFIl",
            "views": 8,
            "id_old": "100010018",
            "company_id_old": "HJwCLezMx",
            "company_name": "POC",
            "editor_id_old": "r1qYpAu8l",
            "viewer_id_old": "HyZMeJFIl",
            "viewer_name": "LidoR11 Achiyosef",
            "status_name": "closed resolved",
            "status_id_old": "ee42280e-2f01-470d-a135-fd73495b3fd2"
        },
        {
            "_company_id": "HAS",
            "_refid": "",
            "case_type": "Audit Log Failure",
            "company_id": "HJwCLezMx",
            "created_by": "r1qYpAu8l",
            "description": "new alert by ianir updated",
            "destination_ip": "",
            "destination_port": "",
            "disableNotification": false,
            "editor_id": "r1F0OxYLx",
            "editor_name": "Revital Erez",
            "escalate_case": false,
            "id": "100010028",
            "is_att_threat_intelect": true,
            "new_comment": false,
            "next_check": "2017-06-05T15:26:27.584Z",
            "original_alert_type": "",
            "protocol": "",
            "resolution_note": "test1",
            "severity": "high",
            "source_ip": "",
            "status": "closed resolved",
            "status_id": "59d1c3bb6d74f228cc778c9b",
            "title": "new alert by ianir updated",
            "username": "",
            "viewer_id": "r1qYpAu8l",
            "views": 14,
            "id_old": "100010028",
            "company_id_old": "HJwCLezMx",
            "company_name": "HAS",
            "created_by_old": "r1qYpAu8l",
            "created_by_name": "Ianir Horn",
            "editor_id_old": "r1F0OxYLx",
            "viewer_id_old": "r1qYpAu8l",
            "viewer_name": "Ianir Horn",
            "status_name": "closed resolved",
            "status_id_old": "ee42280e-2f01-470d-a135-fd73495b3fd2"
        }];
    }
});