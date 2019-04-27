
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { fp } from '../src/fp';

@TestFixture('Test the FP functions')
export class FP {
    @Test('maybeJson')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeJson(object: any) {
        const json = JSON.stringify(object);
        const parsed = fp.maybeJson(json);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeString')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeString(object: any) {
        const json = JSON.stringify(object);
        const parsed = fp.maybeString(json);
        Expect(parsed).not.toBeNull();
    }

    @Test('proto')
    @TestCase({ prop1: 1, prop2: 2 })
    public async proto(object: any) {
        const parsed = fp.maybeProto(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybe')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybe(object: any) {
        const parsed = fp.maybe(object);
        Expect(parsed).not.toBeNull();
    }

}
