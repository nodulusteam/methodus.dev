import { Connection, Repo, Model, Field, Virtual, Lookup, Weight, ObjectId, IsoDate, ReturnType, Transform } from '../../';


@Model('Alert', Transform.Automatic)
@Connection('default')
export class Alert extends Repo<Alert> {

    @ObjectId()
    @Field('id')
    public _id: string;


    @Field('_id')
    public id: string;

    @Field('alert.title')
    public alert_title: string

    @Field('created_at')
    public created_at: Date;

    @Field('_company_id')
    public _company_id: string;

    @Field('alert.count_index')
    public alert_count_index: number;

    @Field('alert.count')
    public alert_count: number;

    @Weight([
        { 'critical': 1 },
        { 'high': 2 },
        { 'medium': 3 },
        { 'low': 4 },
        { 'information': 5 }])
    @Field('severity')
    public severity: string;

    constructor(alert?: {}) {
        super(alert, Alert);
    }
}
