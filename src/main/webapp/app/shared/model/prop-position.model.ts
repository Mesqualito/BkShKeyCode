import { Moment } from 'moment';

export interface IPropPosition {
  id?: number;
  timestamp?: Moment;
  posValue?: number;
  description?: string;
}

export class PropPosition implements IPropPosition {
  constructor(public id?: number, public timestamp?: Moment, public posValue?: number, public description?: string) {}
}
