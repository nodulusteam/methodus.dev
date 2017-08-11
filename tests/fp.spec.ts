import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { fp } from '../src/fp';
@TestFixture("Test the FP functions")
export class FP {
    @Test("maybeJson")
    @TestCase({ 'prop1': 1, prop2: 2 })
    public async maybeJson(object) {
        let json = JSON.stringify(object);
        let parsed = fp.maybeJson(json);
        Expect(parsed).not.toBeNull();
    }
}
