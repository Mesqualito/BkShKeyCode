import { Moment } from 'moment';
import { IUom } from 'app/shared/model/uom.model';
import { IItemReference } from 'app/shared/model/item-reference.model';
import { IExtendedTextHeader } from 'app/shared/model/extended-text-header.model';
import { IItemSubstitution } from 'app/shared/model/item-substitution.model';
import { IItemStaging } from 'app/shared/model/item-staging.model';
import { IItemHistory } from 'app/shared/model/item-history.model';

export interface IItem {
  id?: number;
  timestamp?: Moment;
  modificationDate?: Moment;
  no?: string;
  no2?: string;
  name?: string;
  unitPrice?: number;
  netWeight?: number;
  hsNo?: string;
  hsDescription?: string;
  hsComment?: string;
  isBlocked?: boolean;
  itemCategoryCode?: string;
  productGroupCode?: string;
  wsCategory3Code?: string;
  isGTIN?: boolean;
  isOnlySpareparts?: boolean;
  isUsedForWebshop?: boolean;
  applicationKind?: string;
  strapType?: string;
  sealType?: string;
  driveType?: string;
  strapTensionMax?: number;
  strapWidth?: string;
  strappingsPerDay?: number;
  akkuType?: string;
  akkuBrand?: string;
  akkuCapacitiy?: number;
  akkuVoltage?: number;
  sealFixity?: number;
  speed?: number;
  motors?: number;
  strapThicknessMin?: number;
  strapThicknessMax?: number;
  isInProductFinder?: boolean;
  isFullyAutomaticTension?: boolean;
  isWeldingByButton?: boolean;
  buom?: IUom;
  suom?: IUom;
  itemReferences?: IItemReference[];
  extendedTextHeaders?: IExtendedTextHeader[];
  substNos?: IItemSubstitution[];
  itemStagings?: IItemStaging[];
  itemHistories?: IItemHistory[];
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public modificationDate?: Moment,
    public no?: string,
    public no2?: string,
    public name?: string,
    public unitPrice?: number,
    public netWeight?: number,
    public hsNo?: string,
    public hsDescription?: string,
    public hsComment?: string,
    public isBlocked?: boolean,
    public itemCategoryCode?: string,
    public productGroupCode?: string,
    public wsCategory3Code?: string,
    public isGTIN?: boolean,
    public isOnlySpareparts?: boolean,
    public isUsedForWebshop?: boolean,
    public applicationKind?: string,
    public strapType?: string,
    public sealType?: string,
    public driveType?: string,
    public strapTensionMax?: number,
    public strapWidth?: string,
    public strappingsPerDay?: number,
    public akkuType?: string,
    public akkuBrand?: string,
    public akkuCapacitiy?: number,
    public akkuVoltage?: number,
    public sealFixity?: number,
    public speed?: number,
    public motors?: number,
    public strapThicknessMin?: number,
    public strapThicknessMax?: number,
    public isInProductFinder?: boolean,
    public isFullyAutomaticTension?: boolean,
    public isWeldingByButton?: boolean,
    public buom?: IUom,
    public suom?: IUom,
    public itemReferences?: IItemReference[],
    public extendedTextHeaders?: IExtendedTextHeader[],
    public substNos?: IItemSubstitution[],
    public itemStagings?: IItemStaging[],
    public itemHistories?: IItemHistory[]
  ) {
    this.isBlocked = this.isBlocked || false;
    this.isGTIN = this.isGTIN || false;
    this.isOnlySpareparts = this.isOnlySpareparts || false;
    this.isUsedForWebshop = this.isUsedForWebshop || false;
    this.isInProductFinder = this.isInProductFinder || false;
    this.isFullyAutomaticTension = this.isFullyAutomaticTension || false;
    this.isWeldingByButton = this.isWeldingByButton || false;
  }
}
