import { Database } from './index';
const DB: any = new Database();

export class Repository<T> {

    static async  create(item: any) {
        return await DB[this.name].insert(item);
    }
    static async  insert(item: any) {
        return await DB[this.name].insert(item);
    }

    static async  getAll() {
        const arr = await DB[this.name].find({});
        return arr;
    }
    static async  getByField(field: any, value: any) {
        const obj: any = {};
        obj[field] = value;
        const arr = await DB[this.name].find(obj);
        return arr;
    }

    static async  getById(id: number) {
        const result = await DB[this.name].find({ id: id + '' });
        return result;
    }
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
