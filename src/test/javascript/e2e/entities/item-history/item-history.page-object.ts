import { element, by, ElementFinder } from 'protractor';

export class ItemHistoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-history div table .btn-danger'));
  title = element.all(by.css('jhi-item-history div h2#page-heading span')).first();

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

export class ItemHistoryUpdatePage {
  pageTitle = element(by.id('jhi-item-history-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  modificationDateInput = element(by.id('field_modificationDate'));
  modifiedInput = element(by.id('field_modified'));

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

  getModifiedInput(timeout?: number) {
    return this.modifiedInput;
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

export class ItemHistoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemHistory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemHistory'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
