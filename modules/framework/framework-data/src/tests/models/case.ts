import { Connection, Repo, Model, Field, Virtual, Lookup, ObjectId, IsoDate, ReturnType, Transform } from '../../';

@Model('Case', Transform.Automatic)
@Connection('default')
export class Case extends Repo<Case> {

    @ObjectId()
    @Field('_id')
    public _id: string;

    @Field()
    public _company_id: string;

    @Field()
    public aggregation_key: string;

    @Field()
    public case_type: string;

    @ObjectId()
    @Field()
    public company_id: string;

    @Field()
    public compliance_items: string;

    @Field()
    public created_at: Date;

    @ObjectId()
    @Field()
    public created_by: string;

    @Field()
    public created_by_name: string;

    @Field()
    public description: string;
    @Field()
    public edited_at: Date;

    @ObjectId()
    @Field()
    public editor_id: string;

    @Field()
    public editor_name: string;

    @Field()
    public escalate_case: boolean;

    @Field()
    public escalation_details: any;

    @Field()
    public id: string;

    @Field()
    public is_att_threat_intelect: boolean;

    @Field()
    public new_comment: boolean;

    @Field()
    public recommendation: string;

    @Field()
    public resolution_note: string;

    @Field()
    public severity: string;

    @Field()
    public status: string;

    @ObjectId()
    @Field()
    public status_id: string;

    @Field()
    public title: string;

    @ObjectId()
    @Field()
    public viewer_id: string;

    @Field()
    public views: number;

    @Field()
    public company_name: string;

    @Field()
    public viewer_name: string;

    @Field()
    public status_name: string;
    @Field()
    public closed_at: Date;

    @Field()
    public files: any;
    constructor(_case?: {}) {
        super(_case, Case);
    }
}
