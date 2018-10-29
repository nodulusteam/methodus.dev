
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { fp } from '../fp';

@TestFixture('Test the FP functions')
export class FP {
    @Test('maybeJson')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeJson(object) {
        const json = JSON.stringify(object);
        const parsed = fp.maybeJson(json);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeString')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeString(object) {
        const json = JSON.stringify(object);
        const parsed = fp.maybeString(json);
        Expect(parsed).not.toBeNull();
    }

    @Test('proto')
    @TestCase({ prop1: 1, prop2: 2 })
    public async proto(object) {
        const parsed = fp.maybeProto(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybe')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybe(object) {
        const parsed = fp.maybe(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('array')
    @TestCase([{ prop1: 1, prop2: 2 }, { prop1: 1, prop2: 2 }])
    public async array(object) {

        const parsed = fp.array(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('ensure')
    @TestCase({ prop1: 1, prop2: 2 })
    public async ensure(object) {
        fp.ensure(object, 'prop3', 1);
        Expect(object.prop3).toBe(1);
    }

@Test('ensureArray')
    @TestCase([{ prop1: 1, prop2: 2 }, {}])
    public async ensureArray(object) {
        fp.ensure(object, 'prop3', 1);
        Expect(object[0].prop3).toBe(1);
    }
}
