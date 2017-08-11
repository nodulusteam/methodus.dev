// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { fp } from '../src/fp';




xdescribe('test custom function', function () {
    it('maybeJson', () => {
        //run the servers
        let object = { 'prop1': 1, prop2: 2 }
        let json = JSON.stringify(object);

        let parsed = fp.maybeJson(json);
        expect(parsed).not.to.equal(null);



    });


});
