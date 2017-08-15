
        import { logger, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, Event, EventName } from '../../index';

        @MethodConfig('TestClass')
        export class TestClass {
            constructor() { }
            

        @Method(Verbs.GET, '/posts/:id/:name')
        public action1() {
            
            
            
        }

        @Method(Verbs.POST, '/posts/error')
        public error() {
            
            
            
        }

        @Method(Verbs.POST, '/posts/')
        public action2() {
            
            
            
        }

        @Method(Verbs.DELETE, 'api/acion1')
        public action3() {
            
            
            
        }
}