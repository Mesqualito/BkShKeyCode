import { by, element, ElementFinder } from 'protractor';

export class UomComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-uom div table .btn-danger'));
  title = element.all(by.css('jhi-uom div h2#page-heading span')).first();

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

export class UomUpdatePage {
  pageTitle = element(by.id('jhi-uom-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  modificationDateInput = element(by.id('field_modificationDate'));
  rankInput = element(by.id('field_rank'));
  codeInput = element(by.id('field_code'));
  descriptionInput = element(by.id('field_description'));
  factorInput = element(by.id('field_factor'));

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

  async setRankInput(rank) {
    await this.rankInput.sendKeys(rank);
  }

  async getRankInput() {
    return await this.rankInput.getAttribute('value');
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

  async setFactorInput(factor) {
    await this.factorInput.sendKeys(factor);
  }

  async getFactorInput() {
    return await this.factorInput.getAttribute('value');
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

export class UomDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-uom-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-uom'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
