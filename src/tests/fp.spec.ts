process.env.test = 'true';
import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';
import { fp } from '../fp';
@TestFixture('Test the FP functions')
export class FP {
    @Test('maybeJson')
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async maybeJson(object) {
        let json = JSON.stringify(object);
        let parsed = fp.maybeJson(json);
        Expect(parsed).not.toBeNull();
    }


    @Test('maybeString')
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async maybeString(object) {
        let json = JSON.stringify(object);
        let parsed = fp.maybeString(json);
        Expect(parsed).not.toBeNull();
    }


    @Test('proto')
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async proto(object) {
        let json = JSON.stringify(object);
        let parsed = fp.maybeProto(new Object());
        Expect(parsed).not.toBeNull();
    }
    @Test('maybe')
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async maybe(object) {
        let json = JSON.stringify(object);
        let parsed = fp.maybe(new Object());
        Expect(parsed).not.toBeNull();
    }


    @Test('array')
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async array(object) {
        let json = JSON.stringify(object);
        let parsed = fp.array(new Object());
        Expect(parsed).not.toBeNull();
    }


}
