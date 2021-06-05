
import { logger } from '../logger';
import { IChangesUpdater } from '../interfaces';
import { DataChange } from './data-changes';
import { ChangeDelta } from './change-delta';
import { DBHandler } from '../connect';
import { Odm } from '../odm';
import { Repo } from '../repo';

export class DataChangeEvent<T = any> {
    constructor(public collectionName: string, public changesData?: DataChange, public data?: T, public context?: any) {

    }


    public async NormalizeProperties(data: any, dataModel: any, collectionProps: Array<IChangesUpdater>) {
        let changesId: string = data.id || data._id;
        let newValues: ChangeDelta = this.changesData.value.new_value;
        collectionProps.forEach(async (collectionProp: IChangesUpdater) => {
            newValues.property.forEach(async (propertyName: string, index: number) => {
                if (propertyName === collectionProp.updatedPropertyName) {
                    await this.updateCollection(dataModel, collectionProp, newValues.value[propertyName], changesId);
                }
            });
        });
    }

    private async updateCollection(dataModel: any, collectionProp: IChangesUpdater, value: any, id: string) {
        let commentData: Repo<any> = new dataModel({
            [collectionProp.value]: value
        });
        try {
            delete commentData['modelType'];
            delete commentData['odm'];
            const connection = await DBHandler.getConnection();
            const result = await connection.collection(this.collectionName).updateMany({
                [collectionProp.key]: Odm.applyObjectID(id)
            }, { $set: commentData });
            return result;
        }
        catch (ex) {
            logger.error(this, ex);
        }
    }


}
