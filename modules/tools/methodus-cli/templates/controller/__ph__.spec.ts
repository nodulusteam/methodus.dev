import {   injectionModule as injection, } from '@methodus/server';
import { <%=projectName%> } from './<%=projectNameCamel%>';

describe('<%=projectName%>', () => {

     
    let controller: <%=projectName%>;
    beforeAll(() => {        
        controller = injection.Injector.get(<%=projectName%>);
    })

    it('Controller created', async () => {
        expect(controller).toBeDefined();
    });
});
