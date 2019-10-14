import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';

export interface IItemStaging {
  id?: number;
  timestamp?: Moment;
  item?: IItem;
}

export class ItemStaging implements IItemStaging {
  constructor(public id?: number, public timestamp?: Moment, public item?: IItem) {}
}
