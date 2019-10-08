import { Moment } from 'moment';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';
import { IItemReference } from 'app/shared/model/item-reference.model';
import { IItemProperty } from 'app/shared/model/item-property.model';

export interface IRank {
  id?: number;
  timestamp?: Moment;
  prioValue?: number;
  subsRank?: IItemSubstitution;
  refRank?: IItemReference;
  shcodeRank?: IItemProperty;
}

export class Rank implements IRank {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public prioValue?: number,
    public subsRank?: IItemSubstitution,
    public refRank?: IItemReference,
    public shcodeRank?: IItemProperty
  ) {}
}
