import { Injector } from '@methodus/server';
import { <%=projectName%> } from './<%=projectNameCamel%>';

describe('<%=projectName%>', () => {

     
    let service: <%=projectName%>;
    beforeAll(() => {        
        service = Injector.get(<%=projectName%>);
    })

    it('Service created', async () => {
        expect(service).toBeDefined();
    });
});
