import { Moment } from 'moment';
import { IItemProperty } from 'app/shared/model/item-property.model';
import { IItem } from 'app/shared/model/item.model';
import { IItemReference } from 'app/shared/model/item-reference.model';

export interface IUom {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  rank?: number;
  code?: string;
  description?: string;
  factor?: number;
  propPosition?: IItemProperty;
  itemBuom?: IItem;
  itemSuom?: IItem;
  refUom?: IItemReference;
}

export class Uom implements IUom {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public modificationDate?: Moment,
    public rank?: number,
    public code?: string,
    public description?: string,
    public factor?: number,
    public propPosition?: IItemProperty,
    public itemBuom?: IItem,
    public itemSuom?: IItem,
    public refUom?: IItemReference
  ) {}
}
