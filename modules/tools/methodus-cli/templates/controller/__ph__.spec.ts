import injection from '@methodus/server/injection';
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
