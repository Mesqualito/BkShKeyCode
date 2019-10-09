import { by, element, ElementFinder } from 'protractor';

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
  uomSelect = element(by.id('field_uom'));
  coderankSelect = element(by.id('field_coderank'));

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

  async coderankSelectLastOption(timeout?: number) {
    await this.coderankSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coderankSelectOption(option) {
    await this.coderankSelect.sendKeys(option);
  }

  getCoderankSelect(): ElementFinder {
    return this.coderankSelect;
  }

  async getCoderankSelectedOption() {
    return await this.coderankSelect.element(by.css('option:checked')).getText();
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
