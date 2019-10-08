import { Moment } from 'moment';
import { IRank } from 'app/shared/model/rank.model';
import { IItem } from 'app/shared/model/item.model';

export interface IItemReference {
  id?: number;
  timestamp?: Moment;
  uom?: string;
  crossReferenceType?: string;
  crossReferenceTypeNo?: string;
  crossReferenceNo?: string;
  description?: string;
  qualifier?: string;
  reference?: IRank;
  item?: IItem;
}

export class ItemReference implements IItemReference {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public uom?: string,
    public crossReferenceType?: string,
    public crossReferenceTypeNo?: string,
    public crossReferenceNo?: string,
    public description?: string,
    public qualifier?: string,
    public reference?: IRank,
    public item?: IItem
  ) {}
}
