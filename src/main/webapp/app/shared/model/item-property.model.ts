import { Moment } from 'moment';
import { IUom } from 'app/shared/model/uom.model';
import { IPropPosition } from 'app/shared/model/prop-position.model';

export interface IItemProperty {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  code?: string;
  description?: string;
  uom?: IUom;
  coderank?: IPropPosition;
}

export class ItemProperty implements IItemProperty {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public modificationDate?: Moment,
    public code?: string,
    public description?: string,
    public uom?: IUom,
    public coderank?: IPropPosition
  ) {}
}
