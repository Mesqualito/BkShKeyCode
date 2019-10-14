import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';

export interface IItemHistory {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  modified?: boolean;
  item?: IItem;
}

export class ItemHistory implements IItemHistory {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public modificationDate?: Moment,
    public modified?: boolean,
    public item?: IItem
  ) {
    this.modified = this.modified || false;
  }
}
