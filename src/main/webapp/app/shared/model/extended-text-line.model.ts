import { Moment } from 'moment';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

export interface IExtendedTextLine {
  id?: number;
  timestamp?: Moment;
  tableName?: string;
  no?: string;
  textNo?: number;
  lineNo?: number;
  text?: string;
  textline?: IExtendedTextHeader;
}

export class ExtendedTextLine implements IExtendedTextLine {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public tableName?: string,
    public no?: string,
    public textNo?: number,
    public lineNo?: number,
    public text?: string,
    public textline?: IExtendedTextHeader
  ) {}
}
