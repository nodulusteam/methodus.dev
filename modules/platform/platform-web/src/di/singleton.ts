import 'reflect-metadata'
const ANNOTATIONS = '__annotations__';

export function Singleton() {
    function DecoratorFactory(cls: any) {

        const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
            cls[ANNOTATIONS] :
            Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];

        annotations.push('singleton');
        return cls;
    }
    return DecoratorFactory
}
