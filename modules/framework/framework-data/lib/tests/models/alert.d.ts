import { Repo } from '../../';
export declare class Alert extends Repo<Alert> {
    _id: string;
    id: string;
    alert_title: string;
    created_at: Date;
    _company_id: string;
    alert_count_index: number;
    alert_count: number;
    severity: string;
    constructor(alert?: {});
}
