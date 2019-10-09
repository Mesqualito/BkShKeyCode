import { Moment } from 'moment';

export interface IItemHistory {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  modified?: boolean;
}

export class ItemHistory implements IItemHistory {
  constructor(public id?: number, public timestamp?: Moment, public modificationDate?: Moment, public modified?: boolean) {
    this.modified = this.modified || false;
  }
}
