import { Repository } from './repository';



export class SchoolModel extends Repository<SchoolModel> {
    id: string;
    name: string;
    address: string;



    constructor(id, name, address?) {
        super('School');
        this.id = id;
        this.name = name;
        this.address = address;

    }


}

