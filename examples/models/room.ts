import { Repository } from './repository';

export class RoomModel extends Repository<RoomModel> {
    id: string;
    name: string;

    constructor(id, name) {
        super('Room');
        this.id = id;
        this.name = name;

    }


}

