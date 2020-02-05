import { deserialize } from "./deserialize";

describe('Deserialize', () => {
    it('Boolean string', () => {
        const deserializeResult = deserialize({ type: 'bool', value: 'false' })
        expect(deserializeResult).toBe(false);
    });

    it('Date string', () => {
        const deserializeResult = deserialize({ type: 'date', value: '12/01/1975' })
        expect(deserializeResult).toBeDefined();
    });

    it('Simple string', () => {
        const deserializeResult = deserialize({ type: 'string', value: 'my name is slim shady' })
        expect(deserializeResult).toBe('my name is slim shady');
    });

    it('Object string', () => {
        const deserializeResult = deserialize({ type: 'object', value: '{"name":"my name"}' })
        expect(deserializeResult).toStrictEqual({ "name": "my name" });
    });

    it('object with deserializer function', () => {
        const deserializeResult = deserialize({ type: { deserialize: (value: any) => JSON.parse(value) }, value: 'false' })
        expect(deserializeResult).toBe(false);
    });

    it('object with deserializer with a class type', () => {
        const deserializeResult = deserialize({ type: requestedType, value: '{ "name": "my name" }' })
        expect(deserializeResult.name).toBe("my name");
    });

    it('object with deserializer with a string object', () => {
        const deserializeResult = deserialize({ value: '{ "name": "my name" }' })
        expect(deserializeResult.name).toBe("my name");
    });


    it('object with deserializer with direct object', () => {
        const deserializeResult = deserialize({ "name": "my name" });
        expect(deserializeResult.name).toBe("my name");
    });

});



class requestedType {
    /**
     *
     */
    constructor(data: requestedType) {

        this.name = data.name;

    }
    name: string;
}