import { Moment } from 'moment';
import { IExtendedTextLine } from 'app/shared/model/extended-text-line.model';
import { IItem } from 'app/shared/model/item.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface IExtendedTextHeader {
  id?: number;
  timestamp?: Moment;
  tableName?: string;
  no?: string;
  startingDate?: Moment;
  endingDate?: Moment;
  textNo?: number;
  description?: string;
  extendedTextLines?: IExtendedTextLine[];
  item?: IItem;
  header?: ILanguage;
}

export class ExtendedTextHeader implements IExtendedTextHeader {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public tableName?: string,
    public no?: string,
    public startingDate?: Moment,
    public endingDate?: Moment,
    public textNo?: number,
    public description?: string,
    public extendedTextLines?: IExtendedTextLine[],
    public item?: IItem,
    public header?: ILanguage
  ) {}
}
