import { Repository } from './repository';

export class PlayerModel extends Repository<PlayerModel> {
    id: string;
    name: string;
    username: string;
    email: string;
    address: any;
    phone: string;
    website: string;
    company: any;


    constructor(id, name, username?, email?) {
        super('Player');
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }


}

