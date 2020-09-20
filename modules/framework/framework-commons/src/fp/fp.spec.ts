import { fp } from './index';


class TestController {

}
describe('Test the FP functions', () => {

    it('maybeJson', async () => {
        const parsed = fp.maybeJson('{ "prop1": "1", "prop2": "2" }');
        expect(parsed).not.toBeNull();

        const parsedNull = fp.maybeJson(null);
        expect(parsedNull).not.toBeNull();
    });

    it('maybeMethodus', async () => {
        const parsed = fp.maybeMethodus(TestController);
        expect(parsed).not.toBeNull();
    });

    it('maybeString', async () => {
        const parsed = fp.maybeString({ prop1: 1, prop2: 2 });
        expect(parsed).not.toBeNull();

        const parsedNull = fp.maybeString(null);
        expect(parsedNull).not.toBeNull();
    });

    it('maybeProto', async () => {
        const parsed = fp.maybeProto(TestController);
        expect(parsed).not.toBeNull();

        const parsed2 = fp.maybeProto(null);
        expect(parsed2).toBeNull();

    });

    // it('unique', async () => {
    //     const parsed = fp.unique([1, 1, 1, 2, 3, 4]);
    //     expect(JSON.stringify(parsed)).toBe(JSON.stringify([1, 2, 3, 4]));
    // });


    it('maybeEach', async () => {
        fp.maybeEach([1, 1, 1, 2, 3, 4], (parsed: any) => {
            expect(parsed).not.toBeNull();
        });
    });

    it('maybe', async () => {
        const parsed = fp.maybe([1, 1, 1, 2, 3, 4]);
        expect(parsed).not.toBeNull();

        const parsedNull = fp.maybe(null);
        expect(parsedNull).not.toBeNull();
    });

});







//     @Test('maybeProto')
//     @TestCase({ prop1: 1, prop2: 2 })
//     // @TestCase({})
//     // @TestCase(null)
//     // @TestCase([])                        
//     public async maybeProto(object: any) {
//         const parsed = fp.maybeProto(object);
//         Expect(parsed).not.toBeNull();
//     }

//     @Test('maybe')
//     @TestCase({ prop1: 1, prop2: 2 })
//     @TestCase(null)
//     public async maybe(object: any) {
//         const parsed = fp.maybe(object);
//         Expect(parsed).not.toBeNull();
//     }

//     @Test('unique')
//     @TestCase([1, 1, 1, 2, 3, 4])
//     @TestCase(null)
//     public async unique(object: any) {
//         const parsed = fp.unique(object);
//         Expect(parsed).not.toBeNull();
//     }

//     @Test('maybeEach')
//     @TestCase([1, 1, 1, 2, 3, 4])
//     @TestCase('nothing for each')
//     public async maybeEach(object: any) {
//         fp.maybeEach(object, (parsed: any) => {
//             Expect(parsed).not.toBeNull();
//         });

//     }

// }
