export interface IBkencoder {
  id?: number;
}

export class Bkencoder implements IBkencoder {
  constructor(public id?: number) {}
}
