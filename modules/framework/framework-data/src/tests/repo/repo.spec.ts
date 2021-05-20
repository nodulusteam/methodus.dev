import { getConnection } from '../setup.spec';
import { expect } from 'chai';
import { Alert } from '../models/alert';
import { Repo } from '../../repo';
import { ObjectID } from 'mongodb';
let _alertId: any = null;
import * as _ from 'lodash';
import { ReturnType } from '../../';

describe('repo tests - by inheritance', () => {
    const alertMock: any = {};
    alertMock._id = new ObjectID();
    /*before(async () => {
        const conn = await getConnection();
        await conn.collection('Alert').remove({});
    });*/

    it('should read record successfully by id from alerts collection', async () => {
        // const conn: any = await getConnection();
        // await conn.collection('Alert').insertOne({
        //     _id: alertMock._id,
        //     alert_title: 'my_title'
        // });

        // const all =  await conn.collection('Alert').find(alertMock._id).toArray();
        // console.log(all);
        //given
        const savedAlert: any = await Alert.insert({
            _id: alertMock._id,
            alert_title: 'my_title'
        });
        //when
        const alert = await Alert.get(savedAlert.id.toString());

        //then
        expect(alert._id.toString()).is.equal(alertMock._id.toString());
    });

    it('repo insert test', async () => {
        // given
        const alertModel = new Alert({
            _id: alertMock._id,
            alert_title: 'my_title'
        });
        // when
        const alert: any = await alertModel.insert();
        //then
        expect(alert._id.toString()).is.equal(alertMock._id.toString());
    });

    it('repo save test', async () => {
        // given
        const data = {
            _id: alertMock._id,
            alert_title: 'my_title'
        };
        // when
        const alert: any = await Alert.save(data);
        //then
        expect(alert._id.toString()).is.equal(alertMock._id.toString());
    });


    it('repo find test', async () => {
        const conn: any = await getConnection();
        await conn.collection('Alert').insertOne({
            _id: alertMock._id,
            alert_title: 'my_title'
        });
        //given
        //when        
        const alertModel = new Alert();
        const alert: any = await alertModel.find({ _id: alertMock._id }, ReturnType.Single);

        //then
        expect(alert._id.toString()).is.equal(alertMock._id.toString());
    });


    it('repo find test static', async () => {
        const conn: any = await getConnection();
        await conn.collection('Alert').insertOne({
            _id: alertMock._id,
            alert_title: 'my_title'
        });
        //given
        //when
        const alert = await Alert.find({ _id: alertMock._id }, ReturnType.Single);

        //then
        expect(alert._id.toString()).is.equal(alertMock._id.toString());
    });

    it('repo updateMany', async () => {
        const conn: any = await getConnection();
        await conn.collection('Alert').insertOne({
            _id: alertMock._id,
            alert_title: 'my_title'
        });
        // given
        // when
        const res: any = await Alert.updateMany({ _id: alertMock._id }, { alert_title: 'zokzok_title' });

        // then
        expect(res.result.ok).is.equal(1);
    });

    it('uniqBy lodash', async () => {
        let obj: any = [
            {
                "$match": {
                    "$and": [
                        {
                            "_company_id": "POC"
                        },
                        {
                            "case_id": {
                                "$exists": true
                            }
                        },
                        {
                            "case_id": {
                                "$ne": null
                            }
                        },
                        {
                            "case_id": {
                                "$ne": ""
                            }
                        },
                        {
                            "alert.status": {
                                "$eq": "O"
                            }
                        },
                        {
                            "alert.status": {
                                "$eq": "O"
                            }
                        },
                        {
                            "created_at": {
                                "$gte": "2017-12-31T12:47:26.810Z",
                                "$lte": "2018-01-07T12:47:26.000Z"
                            }
                        }
                    ]
                }
            },
            {
                "$match": {
                    "$and": [
                        {
                            "_company_id": "POC"
                        },
                        {
                            "case_id": {
                                "$exists": true
                            }
                        },
                        {
                            "case_id": {
                                "$ne": null
                            }
                        },
                        {
                            "case_id": {
                                "$ne": ""
                            }
                        },
                        {
                            "alert.status": {
                                "$eq": "O"
                            }
                        },
                        {
                            "alert.status": {
                                "$eq": "O"
                            }
                        },
                        {
                            "created_at": {
                                "$gte": "2017-12-31T12:47:26.810Z",
                                "$lte": "2018-01-07T12:47:26.000Z"
                            }
                        }
                    ]
                }
            },
            {
                "$sort": {
                    "created_at": -1
                }
            },
            {
                "$group": {
                    "_id": null,
                    "totalRows": {
                        "$sum": 1
                    },
                    "results": {
                        "$push": {
                            "_id": "$$ROOT._id",
                            "id": "$$ROOT.id",
                            "_company_id": "$$ROOT._company_id",
                            "company_id": "$$ROOT.company_id",
                            "case_id": "$$ROOT.case_id",
                            "editor_name": "$$ROOT.editor_name",
                            "editor_id": "$$ROOT.editor_id",
                            "edited_at": "$$ROOT.edited_at",
                            "created_at": "$$ROOT.created_at",
                            "created_by": "$$ROOT.created_by",
                            "editor_attUID": "$$ROOT.editor_attUID",
                            "created_by_attUID": "$$ROOT.created_by_attUID",
                            "alert_title": "$$ROOT.alert_title",
                            "alert_status": "$$ROOT.alert_status",
                            "alert_message": "$$ROOT.alert_message",
                            "alert_type": "$$ROOT.alert_type",
                            "alert_count": "$$ROOT.alert_count",
                            "beach_date": "$$ROOT.beach_date",
                            "beach_label1": "$$ROOT.beach_label1",
                            "beach_label2": "$$ROOT.beach_label2",
                            "beach_label3": "$$ROOT.beach_label3",
                            "beach_string1": "$$ROOT.beach_string1",
                            "beach_string2": "$$ROOT.beach_string2",
                            "beach_string3": "$$ROOT.beach_string3",
                            "customer_id": "$$ROOT.customer_id",
                            "customer_location": "$$ROOT.customer_location",
                            "severity": "$$ROOT.severity",
                            "end_date": "$$ROOT.end_date",
                            "device_class": "$$ROOT.device_class",
                            "device_ip": "$$ROOT.device_ip",
                            "device_hostname": "$$ROOT.device_hostname",
                            "device_vendor": "$$ROOT.device_vendor",
                            "device_name": "$$ROOT.device_name",
                            "source_ip": "$$ROOT.source_ip",
                            "source_port": "$$ROOT.source_port",
                            "source_hostname": "$$ROOT.source_hostname",
                            "source_country_name": "$$ROOT.source_country_name",
                            "source_country_code2": "$$ROOT.source_country_code2",
                            "source_location": "$$ROOT.source_location",
                            "source_zone": "$$ROOT.source_zone",
                            "target_ip": "$$ROOT.target_ip",
                            "target_port": "$$ROOT.target_port",
                            "target_hostname": "$$ROOT.target_hostname",
                            "target_country_name": "$$ROOT.target_country_name",
                            "target_location": "$$ROOT.target_location",
                            "target_country_code2": "$$ROOT.target_country_code2",
                            "target_zone": "$$ROOT.target_zone",
                            "target_region_name": "$$ROOT.target_region_name",
                            "protocol": "$$ROOT.protocol",
                            "views": "$$ROOT.views",
                            "event_count": "$$ROOT.event_count",
                            "event_total": "$$ROOT.event_total",
                            "status_id": "$$ROOT.status_id",
                            "_refid": "$$ROOT._refid",
                            "viewer_id": "$$ROOT.viewer_id",
                            "username": "$$ROOT.username",
                            "user_source": "$$ROOT.user_source",
                            "user_target": "$$ROOT.user_target",
                            "disableNotification": "$$ROOT.disableNotification",
                            "created_by_name": "$$ROOT.created_by_name",
                            "applied_rule": "$$ROOT.applied_rule",
                            "category": "$$ROOT.category",
                            "rule_rpt_a": "$$ROOT.rule_rpt_a",
                            "rule_rpt_b": "$$ROOT.rule_rpt_b",
                            "rule_message_to_analyst": "$$ROOT.rule_message_to_analyst",
                            "time_start": "$$ROOT.time_start",
                            "time_stop": "$$ROOT.time_stop",
                            "similar_alerts": "$$ROOT.similar_alerts",
                            "similar_counts": "$$ROOT.similar_counts",
                            "company_name": "$$ROOT.company_name"
                        }
                    }
                }
            },
            {
                "$project": {
                    "total": "$totalRows",
                    "results": {
                        "$slice": [
                            "$results",
                            0,
                            20
                        ]
                    }
                }
            }
        ];
        _.map(
            _.uniq(
                _.map(obj, function (obj) {
                    return JSON.stringify(obj);
                })
            ), function (obj) {
                return JSON.parse(obj);
            }
        );

    })
});

