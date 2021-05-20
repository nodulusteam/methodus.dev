import 'reflect-metadata';
import { Alert } from '../models/alert';
import { ODM } from '../../odm-models';
import { Odm } from '../../odm';
import { expect } from 'chai';
import { ObjectID } from 'mongodb';
import { TransformDirection, Transform, Field, ObjectId, Model, Repo, IsoDate, Number } from '../../';
import { DBHandler } from '../../connect';
import { ModelInMemory } from '../../decorators';
DBHandler.config = {
    connections: {
        'default': {
            server: 'mongodb://localhost:27017',
            db: 'test',
            poolSize: 10,
            ssl: false,
            exchanges: ['event-bus', 'cache-bus'],
            readPreference: 'primaryPreferred'
        }
    }

}

@ModelInMemory('Temp')
export class Temp extends Repo<Temp>{
    @ObjectId()
    @Field('id')
    public _id?: string;

    @IsoDate()
    @Field()
    public created_at?: Date;

    @Field()
    public name?: string;

    constructor(data?) {
        super(data, Temp);
    }
}

@Model('UserRole')
export class UserRole extends Repo<UserRole> {
    @ObjectId()
    @Field('id')
    public _id?: string;

    @IsoDate()
    @Field()
    public created_at?: Date;

    @Field()
    public created_by?: string;

    @Field()
    public role?: string;

    @Field()
    public level?: string;

    @Field()
    public name?: string;

    @Number(null, 'double')
    @Field()
    public order?: number;

    @Field()
    public temp?: Temp;

    constructor(data?) {
        super(data, UserRole);
        this.temp = new Temp({
            name: 'ron test',
            created_at: new Date()
        });
    }
}


describe('odm', () => {
    let alert: Alert;
    beforeEach(() => {
        alert = new Alert();
    })

    it('schema field validator full data', async () => {
        const role = new UserRole({
            name: 'test',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result: any = await role.insert();
        expect(result.order).to.be.equal(role.order);
    });

    it('insert with generic type', async () => {
        const role = new UserRole({
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.insert();

        // const result: UserRole = await Repo.insert<UserRole>(role);
        expect(result.order).to.be.equal(role.order);
    });


    it('save with generic type', async () => {
        const role = new UserRole({
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.save();

        // const result: UserRole = await Repo.insert<UserRole>(role);
        expect(result.order).to.be.equal(role.order);
    });

    it('get static with T', async () => {
        const role = new UserRole({
            _id: new ObjectID(),
            name: 'test user role return object',
            created_at: new Date(),
            created_by: 'Ron Okavi',
            role: 'role',
            level: '1',
            order: 8.8
        });
        const result = await role.save();

        const getRole = await UserRole.get<UserRole>(result._id.toString());
        const getRole2 = await UserRole.get<UserRole>(result._id.toString());
        // const result: UserRole = await Repo.insert<UserRole>(role);
        expect(result.order).to.be.equal(role.order);
        expect(getRole.order).to.be.equal(role.order);
        expect(getRole2.order).to.be.equal(role.order);
    });

    /*
        it('schema field validator partial data', async () => {
            const role = new UserRole({
                name: 'test',
                created_at: new Date(),
            });
            const result: any = await role.insert();
            expect(result.order).to.be.equal(role.order);
        });
    
        it('should create metadata for model using decorators', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.collectionName).to.be.equal('Alert');
        })
    
        it('should add collection name to model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.collectionName).to.be.equal('Alert');
        });
    
        it('should add id field for model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(typeof metadata.fields['_id']).to.be.equal('object');
        });
    
        it('should add id field details for model metadata', () => {
            const metadata: ODM<Alert> = Reflect.getOwnMetadata('odm', Alert);
            expect(metadata.fields['_id'].displayName).to.be.equal('id');
            expect(metadata.fields['_id'].propertyKey).to.be.equal('_id');
        });
    
        describe('transform', () => {
    
            it('should transform in, replace id to _id', () => {
                let _id = new ObjectID().toString();
                alert.id = _id
                alert._id = 'danny';
    
                const odm: ODM = Reflect.getMetadata('odm', Alert);
    
                delete alert['modelType'];
                const transformedAlert = Odm.transform<Alert>(odm, alert, TransformDirection.IN);
    
    
                expect(transformedAlert._id.toString()).to.be.equal(_id);
                expect(transformedAlert.id).to.be.equal('danny');
            });
            //it('should transform out, replace _id to id');
        });
    
        describe('trying to get odm', () => {
    
            it('should get odm for userrole', () => {
                let odm: ODM = Reflect.getMetadata('odm', UserRole);
                expect(Object.keys(odm.fields).length).to.be.equal(7);
            });
    
            it('should get odm for weight', () => {
                let odm: ODM = Reflect.getMetadata('odm', Alert);
                expect(Object.keys(odm.fields.severity.fieldDetails.value).length).to.be.equal(5);
            });
        });*/
});