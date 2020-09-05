import injection from '@methodus/server/injection';
import { <%=projectName%> } from './<%=projectNameCamel%>';

describe('<%=projectName%>', () => {

     
    let service: <%=projectName%>;
    beforeAll(() => {        
        service = injection.Injector.get(<%=projectName%>);
    })

    it('Service created', async () => {
        expect(service).toBeDefined();
    });
});
