import { element, by, ElementFinder } from 'protractor';

export class ItemPropertyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-property div table .btn-danger'));
  title = element.all(by.css('jhi-item-property div h2#page-heading span')).first();

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

export class ItemPropertyUpdatePage {
  pageTitle = element(by.id('jhi-item-property-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  modificationDateInput = element(by.id('field_modificationDate'));
  codeInput = element(by.id('field_code'));
  descriptionInput = element(by.id('field_description'));
  uomInput = element(by.id('field_uom'));
  itempropertySelect = element(by.id('field_itemproperty'));

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

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUomInput(uom) {
    await this.uomInput.sendKeys(uom);
  }

  async getUomInput() {
    return await this.uomInput.getAttribute('value');
  }

  async itempropertySelectLastOption(timeout?: number) {
    await this.itempropertySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async itempropertySelectOption(option) {
    await this.itempropertySelect.sendKeys(option);
  }

  getItempropertySelect(): ElementFinder {
    return this.itempropertySelect;
  }

  async getItempropertySelectedOption() {
    return await this.itempropertySelect.element(by.css('option:checked')).getText();
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

export class ItemPropertyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemProperty-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemProperty'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
