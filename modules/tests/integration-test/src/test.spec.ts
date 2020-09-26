import { AppModule } from './app-module';


describe('test the AppModule', ()=>{
    let appModule:AppModule;
    afterAll(()=>{
        appModule.kill();
    });
    it('create AppModule', () => {
        appModule = new AppModule();
        expect(appModule).toBeDefined();
    })
})

