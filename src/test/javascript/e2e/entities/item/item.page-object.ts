import { by, element, ElementFinder } from 'protractor';

export class ItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item div table .btn-danger'));
  title = element.all(by.css('jhi-item div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ItemUpdatePage {
  pageTitle = element(by.id('jhi-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  modificationDateInput = element(by.id('field_modificationDate'));
  noInput = element(by.id('field_no'));
  no2Input = element(by.id('field_no2'));
  nameInput = element(by.id('field_name'));
  unitPriceInput = element(by.id('field_unitPrice'));
  netWeightInput = element(by.id('field_netWeight'));
  hsNoInput = element(by.id('field_hsNo'));
  hsDescriptionInput = element(by.id('field_hsDescription'));
  hsCommentInput = element(by.id('field_hsComment'));
  isBlockedInput = element(by.id('field_isBlocked'));
  itemCategoryCodeInput = element(by.id('field_itemCategoryCode'));
  productGroupCodeInput = element(by.id('field_productGroupCode'));
  wsCategory3CodeInput = element(by.id('field_wsCategory3Code'));
  isGTINInput = element(by.id('field_isGTIN'));
  isOnlySparepartsInput = element(by.id('field_isOnlySpareparts'));
  isUsedForWebshopInput = element(by.id('field_isUsedForWebshop'));
  applicationKindInput = element(by.id('field_applicationKind'));
  strapTypeInput = element(by.id('field_strapType'));
  sealTypeInput = element(by.id('field_sealType'));
  driveTypeInput = element(by.id('field_driveType'));
  strapTensionMaxInput = element(by.id('field_strapTensionMax'));
  strapWidthInput = element(by.id('field_strapWidth'));
  strappingsPerDayInput = element(by.id('field_strappingsPerDay'));
  akkuTypeInput = element(by.id('field_akkuType'));
  akkuBrandInput = element(by.id('field_akkuBrand'));
  akkuCapacitiyInput = element(by.id('field_akkuCapacitiy'));
  akkuVoltageInput = element(by.id('field_akkuVoltage'));
  sealFixityInput = element(by.id('field_sealFixity'));
  speedInput = element(by.id('field_speed'));
  motorsInput = element(by.id('field_motors'));
  strapThicknessMinInput = element(by.id('field_strapThicknessMin'));
  strapThicknessMaxInput = element(by.id('field_strapThicknessMax'));
  isInProductFinderInput = element(by.id('field_isInProductFinder'));
  isFullyAutomaticTensionInput = element(by.id('field_isFullyAutomaticTension'));
  isWeldingByButtonInput = element(by.id('field_isWeldingByButton'));
  buomSelect = element(by.id('field_buom'));
  suomSelect = element(by.id('field_suom'));
  substNoSelect = element(by.id('field_substNo'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async setModificationDateInput(modificationDate) {
    await this.modificationDateInput.sendKeys(modificationDate);
  }

  async getModificationDateInput() {
    return await this.modificationDateInput.getAttribute('value');
  }

  async setNoInput(no) {
    await this.noInput.sendKeys(no);
  }

  async getNoInput() {
    return await this.noInput.getAttribute('value');
  }

  async setNo2Input(no2) {
    await this.no2Input.sendKeys(no2);
  }

  async getNo2Input() {
    return await this.no2Input.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setUnitPriceInput(unitPrice) {
    await this.unitPriceInput.sendKeys(unitPrice);
  }

  async getUnitPriceInput() {
    return await this.unitPriceInput.getAttribute('value');
  }

  async setNetWeightInput(netWeight) {
    await this.netWeightInput.sendKeys(netWeight);
  }

  async getNetWeightInput() {
    return await this.netWeightInput.getAttribute('value');
  }

  async setHsNoInput(hsNo) {
    await this.hsNoInput.sendKeys(hsNo);
  }

  async getHsNoInput() {
    return await this.hsNoInput.getAttribute('value');
  }

  async setHsDescriptionInput(hsDescription) {
    await this.hsDescriptionInput.sendKeys(hsDescription);
  }

  async getHsDescriptionInput() {
    return await this.hsDescriptionInput.getAttribute('value');
  }

  async setHsCommentInput(hsComment) {
    await this.hsCommentInput.sendKeys(hsComment);
  }

  async getHsCommentInput() {
    return await this.hsCommentInput.getAttribute('value');
  }

  getIsBlockedInput(timeout?: number) {
    return this.isBlockedInput;
  }
  async setItemCategoryCodeInput(itemCategoryCode) {
    await this.itemCategoryCodeInput.sendKeys(itemCategoryCode);
  }

  async getItemCategoryCodeInput() {
    return await this.itemCategoryCodeInput.getAttribute('value');
  }

  async setProductGroupCodeInput(productGroupCode) {
    await this.productGroupCodeInput.sendKeys(productGroupCode);
  }

  async getProductGroupCodeInput() {
    return await this.productGroupCodeInput.getAttribute('value');
  }

  async setWsCategory3CodeInput(wsCategory3Code) {
    await this.wsCategory3CodeInput.sendKeys(wsCategory3Code);
  }

  async getWsCategory3CodeInput() {
    return await this.wsCategory3CodeInput.getAttribute('value');
  }

  getIsGTINInput(timeout?: number) {
    return this.isGTINInput;
  }
  getIsOnlySparepartsInput(timeout?: number) {
    return this.isOnlySparepartsInput;
  }
  getIsUsedForWebshopInput(timeout?: number) {
    return this.isUsedForWebshopInput;
  }
  async setApplicationKindInput(applicationKind) {
    await this.applicationKindInput.sendKeys(applicationKind);
  }

  async getApplicationKindInput() {
    return await this.applicationKindInput.getAttribute('value');
  }

  async setStrapTypeInput(strapType) {
    await this.strapTypeInput.sendKeys(strapType);
  }

  async getStrapTypeInput() {
    return await this.strapTypeInput.getAttribute('value');
  }

  async setSealTypeInput(sealType) {
    await this.sealTypeInput.sendKeys(sealType);
  }

  async getSealTypeInput() {
    return await this.sealTypeInput.getAttribute('value');
  }

  async setDriveTypeInput(driveType) {
    await this.driveTypeInput.sendKeys(driveType);
  }

  async getDriveTypeInput() {
    return await this.driveTypeInput.getAttribute('value');
  }

  async setStrapTensionMaxInput(strapTensionMax) {
    await this.strapTensionMaxInput.sendKeys(strapTensionMax);
  }

  async getStrapTensionMaxInput() {
    return await this.strapTensionMaxInput.getAttribute('value');
  }

  async setStrapWidthInput(strapWidth) {
    await this.strapWidthInput.sendKeys(strapWidth);
  }

  async getStrapWidthInput() {
    return await this.strapWidthInput.getAttribute('value');
  }

  async setStrappingsPerDayInput(strappingsPerDay) {
    await this.strappingsPerDayInput.sendKeys(strappingsPerDay);
  }

  async getStrappingsPerDayInput() {
    return await this.strappingsPerDayInput.getAttribute('value');
  }

  async setAkkuTypeInput(akkuType) {
    await this.akkuTypeInput.sendKeys(akkuType);
  }

  async getAkkuTypeInput() {
    return await this.akkuTypeInput.getAttribute('value');
  }

  async setAkkuBrandInput(akkuBrand) {
    await this.akkuBrandInput.sendKeys(akkuBrand);
  }

  async getAkkuBrandInput() {
    return await this.akkuBrandInput.getAttribute('value');
  }

  async setAkkuCapacitiyInput(akkuCapacitiy) {
    await this.akkuCapacitiyInput.sendKeys(akkuCapacitiy);
  }

  async getAkkuCapacitiyInput() {
    return await this.akkuCapacitiyInput.getAttribute('value');
  }

  async setAkkuVoltageInput(akkuVoltage) {
    await this.akkuVoltageInput.sendKeys(akkuVoltage);
  }

  async getAkkuVoltageInput() {
    return await this.akkuVoltageInput.getAttribute('value');
  }

  async setSealFixityInput(sealFixity) {
    await this.sealFixityInput.sendKeys(sealFixity);
  }

  async getSealFixityInput() {
    return await this.sealFixityInput.getAttribute('value');
  }

  async setSpeedInput(speed) {
    await this.speedInput.sendKeys(speed);
  }

  async getSpeedInput() {
    return await this.speedInput.getAttribute('value');
  }

  async setMotorsInput(motors) {
    await this.motorsInput.sendKeys(motors);
  }

  async getMotorsInput() {
    return await this.motorsInput.getAttribute('value');
  }

  async setStrapThicknessMinInput(strapThicknessMin) {
    await this.strapThicknessMinInput.sendKeys(strapThicknessMin);
  }

  async getStrapThicknessMinInput() {
    return await this.strapThicknessMinInput.getAttribute('value');
  }

  async setStrapThicknessMaxInput(strapThicknessMax) {
    await this.strapThicknessMaxInput.sendKeys(strapThicknessMax);
  }

  async getStrapThicknessMaxInput() {
    return await this.strapThicknessMaxInput.getAttribute('value');
  }

  getIsInProductFinderInput(timeout?: number) {
    return this.isInProductFinderInput;
  }
  getIsFullyAutomaticTensionInput(timeout?: number) {
    return this.isFullyAutomaticTensionInput;
  }
  getIsWeldingByButtonInput(timeout?: number) {
    return this.isWeldingByButtonInput;
  }

  async buomSelectLastOption(timeout?: number) {
    await this.buomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async buomSelectOption(option) {
    await this.buomSelect.sendKeys(option);
  }

  getBuomSelect(): ElementFinder {
    return this.buomSelect;
  }

  async getBuomSelectedOption() {
    return await this.buomSelect.element(by.css('option:checked')).getText();
  }

  async suomSelectLastOption(timeout?: number) {
    await this.suomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async suomSelectOption(option) {
    await this.suomSelect.sendKeys(option);
  }

  getSuomSelect(): ElementFinder {
    return this.suomSelect;
  }

  async getSuomSelectedOption() {
    return await this.suomSelect.element(by.css('option:checked')).getText();
  }

  async substNoSelectLastOption(timeout?: number) {
    await this.substNoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async substNoSelectOption(option) {
    await this.substNoSelect.sendKeys(option);
  }

  getSubstNoSelect(): ElementFinder {
    return this.substNoSelect;
  }

  async getSubstNoSelectedOption() {
    return await this.substNoSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-item-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-item'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
