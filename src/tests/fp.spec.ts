
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { fp } from '../fp';
import { TestController } from './controllers';

@TestFixture('Test the FP functions')
export class FP {

    @Test('maybeJson')
    @TestCase('some string')
    @TestCase(null)
    @TestCase('{ "prop1": "1", "prop2": "2" }')
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeJson(object: any) {
        const parsed = fp.maybeJson(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeMethodus')
    @TestCase(null)
    @TestCase(TestController)
    public async maybeMethodus(object: any) {
        const parsed = fp.maybeMethodus(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeString')
    @TestCase(null)
    @TestCase({ prop1: 1, prop2: 2 })
    public async maybeString(object: any) {
        const parsed = fp.maybeString(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeProto')
    @TestCase({ prop1: 1, prop2: 2 })
    @TestCase({})
    @TestCase(null)
    @TestCase([])
    public async maybeProto(object: any) {
        const parsed = fp.maybeProto(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybe')
    @TestCase({ prop1: 1, prop2: 2 })
    @TestCase(null)
    public async maybe(object: any) {
        const parsed = fp.maybe(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('unique')
    @TestCase([1, 1, 1, 2, 3, 4])
    @TestCase(null)
    public async unique(object: any) {
        const parsed = fp.unique(object);
        Expect(parsed).not.toBeNull();
    }

    @Test('maybeEach')
    @TestCase([1, 1, 1, 2, 3, 4])
    @TestCase('nothing for each')
    public async maybeEach(object: any) {
        fp.maybeEach(object, (parsed: any) => {
            Expect(parsed).not.toBeNull();
        });

    }

}
