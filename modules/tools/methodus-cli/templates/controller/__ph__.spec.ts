import { Injector } from '@methodus/server';
import { <%=projectName%> } from './<%=projectNameCamel%>';

describe('<%=projectName%>', () => {

     
    let controller: <%=projectName%>;
    beforeAll(() => {        
        controller = Injector.get(<%=projectName%>);
    })

    it('Controller created', async () => {
        expect(controller).toBeDefined();
    });
});
