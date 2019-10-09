import { element, by, ElementFinder } from 'protractor';

export class ExtendedTextLineComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extended-text-line div table .btn-danger'));
  title = element.all(by.css('jhi-extended-text-line div h2#page-heading span')).first();

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

export class ExtendedTextLineUpdatePage {
  pageTitle = element(by.id('jhi-extended-text-line-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  tableNameInput = element(by.id('field_tableName'));
  noInput = element(by.id('field_no'));
  textNoInput = element(by.id('field_textNo'));
  lineNoInput = element(by.id('field_lineNo'));
  textInput = element(by.id('field_text'));
  textlineSelect = element(by.id('field_textline'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async setTableNameInput(tableName) {
    await this.tableNameInput.sendKeys(tableName);
  }

  async getTableNameInput() {
    return await this.tableNameInput.getAttribute('value');
  }

  async setNoInput(no) {
    await this.noInput.sendKeys(no);
  }

  async getNoInput() {
    return await this.noInput.getAttribute('value');
  }

  async setTextNoInput(textNo) {
    await this.textNoInput.sendKeys(textNo);
  }

  async getTextNoInput() {
    return await this.textNoInput.getAttribute('value');
  }

  async setLineNoInput(lineNo) {
    await this.lineNoInput.sendKeys(lineNo);
  }

  async getLineNoInput() {
    return await this.lineNoInput.getAttribute('value');
  }

  async setTextInput(text) {
    await this.textInput.sendKeys(text);
  }

  async getTextInput() {
    return await this.textInput.getAttribute('value');
  }

  async textlineSelectLastOption(timeout?: number) {
    await this.textlineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async textlineSelectOption(option) {
    await this.textlineSelect.sendKeys(option);
  }

  getTextlineSelect(): ElementFinder {
    return this.textlineSelect;
  }

  async getTextlineSelectedOption() {
    return await this.textlineSelect.element(by.css('option:checked')).getText();
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

export class ExtendedTextLineDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extendedTextLine-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extendedTextLine'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
