import { Moment } from 'moment';

export interface IItemStaging {
  id?: number;
  timestamp?: Moment;
}

export class ItemStaging implements IItemStaging {
  constructor(public id?: number, public timestamp?: Moment) {}
}
