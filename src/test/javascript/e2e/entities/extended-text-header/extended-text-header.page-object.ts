import { element, by, ElementFinder } from 'protractor';

export class ExtendedTextHeaderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extended-text-header div table .btn-danger'));
  title = element.all(by.css('jhi-extended-text-header div h2#page-heading span')).first();

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

export class ExtendedTextHeaderUpdatePage {
  pageTitle = element(by.id('jhi-extended-text-header-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  tableNameInput = element(by.id('field_tableName'));
  noInput = element(by.id('field_no'));
  startingDateInput = element(by.id('field_startingDate'));
  endingDateInput = element(by.id('field_endingDate'));
  textNoInput = element(by.id('field_textNo'));
  descriptionInput = element(by.id('field_description'));
  itemSelect = element(by.id('field_item'));
  headerSelect = element(by.id('field_header'));

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

  async setStartingDateInput(startingDate) {
    await this.startingDateInput.sendKeys(startingDate);
  }

  async getStartingDateInput() {
    return await this.startingDateInput.getAttribute('value');
  }

  async setEndingDateInput(endingDate) {
    await this.endingDateInput.sendKeys(endingDate);
  }

  async getEndingDateInput() {
    return await this.endingDateInput.getAttribute('value');
  }

  async setTextNoInput(textNo) {
    await this.textNoInput.sendKeys(textNo);
  }

  async getTextNoInput() {
    return await this.textNoInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
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

  async headerSelectLastOption(timeout?: number) {
    await this.headerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async headerSelectOption(option) {
    await this.headerSelect.sendKeys(option);
  }

  getHeaderSelect(): ElementFinder {
    return this.headerSelect;
  }

  async getHeaderSelectedOption() {
    return await this.headerSelect.element(by.css('option:checked')).getText();
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

export class ExtendedTextHeaderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extendedTextHeader-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extendedTextHeader'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
