import { Mapping } from "./mapping";


describe.only('Test Mapping', () => {
    it('push params', async () => {


      const body =  Mapping.Body('name', {});
      body({},'name',0);

    });


});
