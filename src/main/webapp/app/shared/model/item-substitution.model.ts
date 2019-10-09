import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';

export interface IItemSubstitution {
  id?: number;
  timestamp?: Moment;
  type?: string;
  substituteType?: string;
  substituteNo?: string;
  description?: string;
  isInterchangeable?: boolean;
  relationsLevel?: number;
  isCheckedToOriginal?: boolean;
  origCheckDate?: Moment;
  items?: IItem[];
}

export class ItemSubstitution implements IItemSubstitution {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public type?: string,
    public substituteType?: string,
    public substituteNo?: string,
    public description?: string,
    public isInterchangeable?: boolean,
    public relationsLevel?: number,
    public isCheckedToOriginal?: boolean,
    public origCheckDate?: Moment,
    public items?: IItem[]
  ) {
    this.isInterchangeable = this.isInterchangeable || false;
    this.isCheckedToOriginal = this.isCheckedToOriginal || false;
  }
}
