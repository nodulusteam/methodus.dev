import { Connection, Repo, Model, Field, Virtual, Lookup, Weight, ObjectId, IsoDate, ReturnType, Transform } from '../../';
@Model('DashboardSummary', Transform.Automatic)
export class DashboardSummaryModel extends Repo<DashboardSummaryModel>{

    @ObjectId()
    @Field('_id')
    public _id: string;

    @Field()
    public _company_id: string;

    @Field()
    public _devices: any;


    constructor(dashboardSummaryModel?: DashboardSummaryModel) {
        super(dashboardSummaryModel, DashboardSummaryModel);
    }
}