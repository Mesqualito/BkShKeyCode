import { by, element, ElementFinder } from 'protractor';

export class ItemReferenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-reference div table .btn-danger'));
  title = element.all(by.css('jhi-item-reference div h2#page-heading span')).first();

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

export class ItemReferenceUpdatePage {
  pageTitle = element(by.id('jhi-item-reference-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  crossReferenceTypeInput = element(by.id('field_crossReferenceType'));
  crossReferenceTypeNoInput = element(by.id('field_crossReferenceTypeNo'));
  crossReferenceNoInput = element(by.id('field_crossReferenceNo'));
  descriptionInput = element(by.id('field_description'));
  qualifierInput = element(by.id('field_qualifier'));
  uomSelect = element(by.id('field_uom'));
  itemSelect = element(by.id('field_item'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async setCrossReferenceTypeInput(crossReferenceType) {
    await this.crossReferenceTypeInput.sendKeys(crossReferenceType);
  }

  async getCrossReferenceTypeInput() {
    return await this.crossReferenceTypeInput.getAttribute('value');
  }

  async setCrossReferenceTypeNoInput(crossReferenceTypeNo) {
    await this.crossReferenceTypeNoInput.sendKeys(crossReferenceTypeNo);
  }

  async getCrossReferenceTypeNoInput() {
    return await this.crossReferenceTypeNoInput.getAttribute('value');
  }

  async setCrossReferenceNoInput(crossReferenceNo) {
    await this.crossReferenceNoInput.sendKeys(crossReferenceNo);
  }

  async getCrossReferenceNoInput() {
    return await this.crossReferenceNoInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setQualifierInput(qualifier) {
    await this.qualifierInput.sendKeys(qualifier);
  }

  async getQualifierInput() {
    return await this.qualifierInput.getAttribute('value');
  }

  async uomSelectLastOption(timeout?: number) {
    await this.uomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async uomSelectOption(option) {
    await this.uomSelect.sendKeys(option);
  }

  getUomSelect(): ElementFinder {
    return this.uomSelect;
  }

  async getUomSelectedOption() {
    return await this.uomSelect.element(by.css('option:checked')).getText();
  }

  async itemSelectLastOption(timeout?: number) {
    await this.itemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async itemSelectOption(option) {
    await this.itemSelect.sendKeys(option);
  }

  getItemSelect(): ElementFinder {
    return this.itemSelect;
  }

  async getItemSelectedOption() {
    return await this.itemSelect.element(by.css('option:checked')).getText();
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

export class ItemReferenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemReference-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemReference'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
