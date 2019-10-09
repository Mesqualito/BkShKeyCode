import { Moment } from 'moment';
import { IPropPosition } from 'app/shared/model/prop-position.model';

export interface IItemProperty {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  code?: string;
  description?: string;
  uom?: string;
  itemproperty?: IPropPosition;
}

export class ItemProperty implements IItemProperty {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public modificationDate?: Moment,
    public code?: string,
    public description?: string,
    public uom?: string,
    public itemproperty?: IPropPosition
  ) {}
}
