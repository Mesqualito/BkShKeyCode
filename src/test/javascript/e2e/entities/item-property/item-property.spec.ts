// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemPropertyComponentsPage, ItemPropertyDeleteDialog, ItemPropertyUpdatePage } from './item-property.page-object';

const expect = chai.expect;

describe('ItemProperty e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemPropertyUpdatePage: ItemPropertyUpdatePage;
  let itemPropertyComponentsPage: ItemPropertyComponentsPage;
  let itemPropertyDeleteDialog: ItemPropertyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemProperties', async () => {
    await navBarPage.goToEntity('item-property');
    itemPropertyComponentsPage = new ItemPropertyComponentsPage();
    await browser.wait(ec.visibilityOf(itemPropertyComponentsPage.title), 5000);
    expect(await itemPropertyComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.itemProperty.home.title');
  });

  it('should load create ItemProperty page', async () => {
    await itemPropertyComponentsPage.clickOnCreateButton();
    itemPropertyUpdatePage = new ItemPropertyUpdatePage();
    expect(await itemPropertyUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.itemProperty.home.createOrEditLabel');
    await itemPropertyUpdatePage.cancel();
  });

  it('should create and save ItemProperties', async () => {
    const nbButtonsBeforeCreate = await itemPropertyComponentsPage.countDeleteButtons();

    await itemPropertyComponentsPage.clickOnCreateButton();
    await promise.all([
      itemPropertyUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemPropertyUpdatePage.setModificationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemPropertyUpdatePage.setCodeInput('code'),
      itemPropertyUpdatePage.setDescriptionInput('description'),
      itemPropertyUpdatePage.uomSelectLastOption(),
      itemPropertyUpdatePage.coderankSelectLastOption()
    ]);
    expect(await itemPropertyUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await itemPropertyUpdatePage.getModificationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modificationDate value to be equals to 2000-12-31'
    );
    expect(await itemPropertyUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await itemPropertyUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await itemPropertyUpdatePage.save();
    expect(await itemPropertyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemPropertyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemProperty', async () => {
    const nbButtonsBeforeDelete = await itemPropertyComponentsPage.countDeleteButtons();
    await itemPropertyComponentsPage.clickOnLastDeleteButton();

    itemPropertyDeleteDialog = new ItemPropertyDeleteDialog();
    expect(await itemPropertyDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.itemProperty.delete.question');
    await itemPropertyDeleteDialog.clickOnConfirmButton();

    expect(await itemPropertyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
