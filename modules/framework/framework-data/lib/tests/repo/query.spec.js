"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/config.js
const __1 = require("../../");
const index_1 = require("../models/index");
const setup_spec_1 = require("../setup.spec");
const faker = require("faker");
const chai = require("chai");
const expect = chai.expect; // we are using the 'expect' style of Chai
const mongodb_1 = require("mongodb");
function getAlerts() {
    return [
        {
            _company_id: "HAS",
            created_at: new Date("11-12-17"),
            severity: "information",
            rules_date: true,
            case_id: "111621020",
        },
        {
            _company_id: "HAS",
            created_at: new Date("11-10-17"),
            severity: "low",
            case_id: "22388",
        },
        {
            _company_id: "POC",
            created_at: new Date("15-09-17"),
            severity: "information",
            rules_date: false,
        },
        {
            _company_id: "HAS",
            created_at: new Date("18-07-17"),
            severity: "low",
            rules_date: true,
        },
        {
            _company_id: "POC",
            created_at: new Date("03-11-17"),
            severity: "critical",
            case_id: "111621020",
            rules_date: true,
        },
    ];
}
async function insertAlert(key = "") {
    const fullKey = new mongodb_1.ObjectID(key).toString();
    console.log(fullKey);
    await index_1.Alert.insert({
        id: new mongodb_1.ObjectID(key),
        _company_id: "HAS",
        created_at: new Date(),
        severity: "low",
    });
    return fullKey;
}
describe("create a simple query to access mongo collection", () => {
    it("get document by primary key", async () => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let result = await index_1.Alert.get(key);
        expect(result.id.toString()).to.equal(key);
    });
    it("filter by id to be an object", async (done) => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let predicate = new __1.Query(index_1.Alert).filter({ id: key });
        let result = await predicate.run(__1.ReturnType.Single);
        expect(result).to.be.a("object");
        done();
    });
    it("filter by id to be an array", async () => {
        let key = faker.random.alphaNumeric(12);
        key = await insertAlert(key);
        let predicate = new __1.Query(index_1.Alert).filter({
            _id: key
        });
        let result = await predicate.run();
        expect(result).to.be.a("array");
    });
});
describe("create a simple query to access mongo collection", () => {
    it("filter by _company_id,paging count 3 results", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).filter({ _company_id: "HAS" }).paging(1, 5);
        let result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(3);
    });
    it("paging count 5 results", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).order("created_at", "asc").paging(1, 5);
        let result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(5);
    });
    it("group results by severity(low,critical,information,medium,high)", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).group({
            _id: "$severity",
            total: { $sum: 1 },
        });
        let result = await __1.Repo.query(query);
        expect(result.filter((alert) => alert.id === "low").pop().total).to.be.equal(2);
    });
    it("filter,pluck,without", async () => {
        const alerts = [
            {
                _company_id: "HAS",
                created_at: new Date("11-12-17"),
                severity: "high",
                name: "test1",
            },
            {
                _company_id: "HAS",
                created_at: new Date("11-10-17"),
                severity: "low",
                name: "test2",
            },
        ];
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert)
            .filter({ created_at: new Date("11-10-17") })
            .pluck("severity", "created_at")
            .without("name");
        let result = await __1.Repo.query(query);
        expect(result.length).to.equal(1);
        expect(result[0].hasOwnProperty("severity")).to.equal(true);
        expect(result[0].hasOwnProperty("created_at")).to.equal(true);
        expect(result[0].hasOwnProperty("name")).to.equal(false);
    });
    it("merge", async () => {
        const connection = await setup_spec_1.getConnection();
        await Promise.all([
            connection.collection("Company").insertMany([
                { _id: "Maxim", id: "Maxim" },
                { _id: "POC", id: "POC" },
            ]),
            connection.collection("User").insertMany([
                {
                    id: "some id",
                    name: "Orel",
                    company_id: "Maxim",
                    _companies: [{ id: "HAS" }, { id: "POC" }],
                },
                {
                    id: "some id1",
                    name: "Ron",
                    company_id: "POC",
                    _companies: [{ id: "HAS" }, { id: "Maxim" }],
                },
                {
                    id: "some id1",
                    name: "Pablo",
                    company_id: "POC",
                    _companies: [{ id: "HAS" }, { id: "FAKE" }],
                },
                {
                    id: "some id2",
                    name: "Moshe",
                    company_id: "Maxim",
                    _companies: [{ id: "HAS" }, { id: "FAKE" }],
                },
            ]),
        ]);
        let query = new __1.Query(index_1.Company)
            .filter({ id: "Maxim" })
            .merge("User", "_id", "company_id", "users") // $lookup => join user.company_id = company._id
            .merge("User", "id", "_companies.id", "users_addition")
            .addFields([{ irit: "$users_addition" }]);
        let result = await __1.Repo.query(query);
        expect(result.length).to.equal(1);
        expect(result[0].users.length).to.equal(2);
        expect(result[0].users.filter((user) => user.name === "Pablo").length).to.equal(0);
        expect(result[0].users_addition.length).to.equal(1);
        expect(result[0].users_addition[0].name).to.equal("Ron");
    });
    it("exists", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert)
            .filter({ severity: "critical" })
            .exists("case_id")
            .paging(1, 5);
        let result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(1);
    });
    it("not exists", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert)
            .filter({ severity: "information" })
            .notExists("case_id")
            .paging(1, 2);
        let result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(1);
    });
    it("combineNotExistWithExist", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).notExists("case_id").exists("rules_date");
        let result = await __1.Repo.query(query);
        expect(result.length).to.equal(2);
    });
    it("between", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        const query = new __1.Query(index_1.Alert)
            .between("_id", "100020011", "100030011")
            .and({
            severity: "critical",
        })
            .or({
            severity: "medium",
        })
            .paging(1, 5);
        const result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(0);
    });
    it("combineExistWithNotExist", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert)
            .exists("case_id")
            .notExists("rules_date")
            .paging(1, 5);
        let result = await __1.Repo.query(query);
        expect(result.results.length).to.equal(1);
    });
    it("filter by _company_id, count check", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert)
            .filter({ case_id: "111621020" })
            .count("total_alerts");
        let result = await __1.Repo.query(query, __1.ReturnType.Single);
        expect(result.total_alerts).to.equal(2);
    });
    it("filter by _company_id, limit check", async () => {
        const alerts = getAlerts();
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).filter({ case_id: "111621020" }).limit(2);
        let result = await __1.Repo.query(query);
        expect(result.length).to.equal(2);
    });
    it("empty filter check", async () => {
        const alerts = [
            { name: "1" },
            { name: "2" },
            { name: "3" },
            { name: "4" },
            { name: "5" },
            { name: "6" },
        ];
        const connection = await setup_spec_1.getConnection();
        await connection.collection("Alert").insertMany(alerts);
        let query = new __1.Query(index_1.Alert).filter({}).limit(4);
        let result = await __1.Repo.query(query);
        expect(result.length).to.equal(result.length);
    });
});
//# sourceMappingURL=query.spec.js.map