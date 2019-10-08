import { element, by, ElementFinder } from 'protractor';

export class LanguageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-language div table .btn-danger'));
  title = element.all(by.css('jhi-language div h2#page-heading span')).first();

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

export class LanguageUpdatePage {
  pageTitle = element(by.id('jhi-language-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  codeInput = element(by.id('field_code'));
  nameInput = element(by.id('field_name'));
  iso3166Alpha2Input = element(by.id('field_iso3166Alpha2'));
  iso3166Alpha3Input = element(by.id('field_iso3166Alpha3'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setIso3166Alpha2Input(iso3166Alpha2) {
    await this.iso3166Alpha2Input.sendKeys(iso3166Alpha2);
  }

  async getIso3166Alpha2Input() {
    return await this.iso3166Alpha2Input.getAttribute('value');
  }

  async setIso3166Alpha3Input(iso3166Alpha3) {
    await this.iso3166Alpha3Input.sendKeys(iso3166Alpha3);
  }

  async getIso3166Alpha3Input() {
    return await this.iso3166Alpha3Input.getAttribute('value');
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

export class LanguageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-language-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-language'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
