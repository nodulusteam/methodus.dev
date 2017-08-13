import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { TestClass } from './classes/TestClass';




@TestFixture("Test methodulus class with no server definition, should default to local")
export class Classes {
    // use the async/await pattern in your tests as you would in your code
    @AsyncTest("just run the call")
    public async classTest() {
        let tc = new TestClass();
        let result = await tc.action1(1111, 'methodulus');
        Expect(result.result.add).toBe('added');

    }


}
