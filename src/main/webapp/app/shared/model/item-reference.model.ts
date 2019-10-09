import { Moment } from 'moment';
import { IUom } from 'app/shared/model/uom.model';
import { IItem } from 'app/shared/model/item.model';

export interface IItemReference {
  id?: number;
  timestamp?: Moment;
  crossReferenceType?: string;
  crossReferenceTypeNo?: string;
  crossReferenceNo?: string;
  description?: string;
  qualifier?: string;
  uom?: IUom;
  item?: IItem;
}

export class ItemReference implements IItemReference {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public crossReferenceType?: string,
    public crossReferenceTypeNo?: string,
    public crossReferenceNo?: string,
    public description?: string,
    public qualifier?: string,
    public uom?: IUom,
    public item?: IItem
  ) {}
}
