import { element, by, ElementFinder } from 'protractor';

export class ItemSubstitutionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-substitution div table .btn-danger'));
  title = element.all(by.css('jhi-item-substitution div h2#page-heading span')).first();

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

export class ItemSubstitutionUpdatePage {
  pageTitle = element(by.id('jhi-item-substitution-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timestampInput = element(by.id('field_timestamp'));
  typeInput = element(by.id('field_type'));
  substituteTypeInput = element(by.id('field_substituteType'));
  substituteNoInput = element(by.id('field_substituteNo'));
  descriptionInput = element(by.id('field_description'));
  isInterchangeableInput = element(by.id('field_isInterchangeable'));
  relationsLevelInput = element(by.id('field_relationsLevel'));
  isCheckedToOriginalInput = element(by.id('field_isCheckedToOriginal'));
  origCheckDateInput = element(by.id('field_origCheckDate'));
  substitutionSelect = element(by.id('field_substitution'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTimestampInput(timestamp) {
    await this.timestampInput.sendKeys(timestamp);
  }

  async getTimestampInput() {
    return await this.timestampInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return await this.typeInput.getAttribute('value');
  }

  async setSubstituteTypeInput(substituteType) {
    await this.substituteTypeInput.sendKeys(substituteType);
  }

  async getSubstituteTypeInput() {
    return await this.substituteTypeInput.getAttribute('value');
  }

  async setSubstituteNoInput(substituteNo) {
    await this.substituteNoInput.sendKeys(substituteNo);
  }

  async getSubstituteNoInput() {
    return await this.substituteNoInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  getIsInterchangeableInput(timeout?: number) {
    return this.isInterchangeableInput;
  }
  async setRelationsLevelInput(relationsLevel) {
    await this.relationsLevelInput.sendKeys(relationsLevel);
  }

  async getRelationsLevelInput() {
    return await this.relationsLevelInput.getAttribute('value');
  }

  getIsCheckedToOriginalInput(timeout?: number) {
    return this.isCheckedToOriginalInput;
  }
  async setOrigCheckDateInput(origCheckDate) {
    await this.origCheckDateInput.sendKeys(origCheckDate);
  }

  async getOrigCheckDateInput() {
    return await this.origCheckDateInput.getAttribute('value');
  }

  async substitutionSelectLastOption(timeout?: number) {
    await this.substitutionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async substitutionSelectOption(option) {
    await this.substitutionSelect.sendKeys(option);
  }

  getSubstitutionSelect(): ElementFinder {
    return this.substitutionSelect;
  }

  async getSubstitutionSelectedOption() {
    return await this.substitutionSelect.element(by.css('option:checked')).getText();
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

export class ItemSubstitutionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemSubstitution-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemSubstitution'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
