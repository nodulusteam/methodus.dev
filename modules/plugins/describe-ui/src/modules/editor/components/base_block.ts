export class BaseBlock {
    public stringify(message) {
        return JSON.stringify(message, null, 2);
    }
}
