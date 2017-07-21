import { Database } from './index';
const DB = new Database();


export class Repository<T>
{
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    static async  create(item: any) {
        return await DB[this.name].insert(item);
    }
    static async  insert(item: any) {
        return await DB[this.name].insert(item);
    }


    static async  getAll() {
        let arr = await DB[this.name].find({});
        return arr;
    }
    static async  getByField(field, value) {
        let obj = {};
        obj[field] = value;
        let arr = await DB[this.name].find(obj);
        return arr;
    }


    static async  getById(id: number) {
        let result = await DB[this.name].find({ 'id': id + '' });
        return result;
    }
}