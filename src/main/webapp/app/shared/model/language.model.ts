import { Moment } from 'moment';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';

export interface ILanguage {
  id?: number;
  timestamp?: Moment;
  code?: string;
  name?: string;
  iso3166Alpha2?: string;
  iso3166Alpha3?: string;
  languages?: IExtendedTextHeader[];
}

export class Language implements ILanguage {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public code?: string,
    public name?: string,
    public iso3166Alpha2?: string,
    public iso3166Alpha3?: string,
    public languages?: IExtendedTextHeader[]
  ) {}
}
