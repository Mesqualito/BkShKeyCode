// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ExtendedTextHeaderComponentsPage,
  ExtendedTextHeaderDeleteDialog,
  ExtendedTextHeaderUpdatePage
} from './extended-text-header.page-object';

const expect = chai.expect;

describe('ExtendedTextHeader e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extendedTextHeaderUpdatePage: ExtendedTextHeaderUpdatePage;
  let extendedTextHeaderComponentsPage: ExtendedTextHeaderComponentsPage;
  let extendedTextHeaderDeleteDialog: ExtendedTextHeaderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ExtendedTextHeaders', async () => {
    await navBarPage.goToEntity('extended-text-header');
    extendedTextHeaderComponentsPage = new ExtendedTextHeaderComponentsPage();
    await browser.wait(ec.visibilityOf(extendedTextHeaderComponentsPage.title), 5000);
    expect(await extendedTextHeaderComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.extendedTextHeader.home.title');
  });

  it('should load create ExtendedTextHeader page', async () => {
    await extendedTextHeaderComponentsPage.clickOnCreateButton();
    extendedTextHeaderUpdatePage = new ExtendedTextHeaderUpdatePage();
    expect(await extendedTextHeaderUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.extendedTextHeader.home.createOrEditLabel');
    await extendedTextHeaderUpdatePage.cancel();
  });

  it('should create and save ExtendedTextHeaders', async () => {
    const nbButtonsBeforeCreate = await extendedTextHeaderComponentsPage.countDeleteButtons();

    await extendedTextHeaderComponentsPage.clickOnCreateButton();
    await promise.all([
      extendedTextHeaderUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      extendedTextHeaderUpdatePage.setTableNameInput('tableName'),
      extendedTextHeaderUpdatePage.setNoInput('no'),
      extendedTextHeaderUpdatePage.setStartingDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      extendedTextHeaderUpdatePage.setEndingDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      extendedTextHeaderUpdatePage.setTextNoInput('5'),
      extendedTextHeaderUpdatePage.setDescriptionInput('description'),
      extendedTextHeaderUpdatePage.itemSelectLastOption(),
      extendedTextHeaderUpdatePage.headerSelectLastOption()
    ]);
    expect(await extendedTextHeaderUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await extendedTextHeaderUpdatePage.getTableNameInput()).to.eq('tableName', 'Expected TableName value to be equals to tableName');
    expect(await extendedTextHeaderUpdatePage.getNoInput()).to.eq('no', 'Expected No value to be equals to no');
    expect(await extendedTextHeaderUpdatePage.getStartingDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startingDate value to be equals to 2000-12-31'
    );
    expect(await extendedTextHeaderUpdatePage.getEndingDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endingDate value to be equals to 2000-12-31'
    );
    expect(await extendedTextHeaderUpdatePage.getTextNoInput()).to.eq('5', 'Expected textNo value to be equals to 5');
    expect(await extendedTextHeaderUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await extendedTextHeaderUpdatePage.save();
    expect(await extendedTextHeaderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await extendedTextHeaderComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ExtendedTextHeader', async () => {
    const nbButtonsBeforeDelete = await extendedTextHeaderComponentsPage.countDeleteButtons();
    await extendedTextHeaderComponentsPage.clickOnLastDeleteButton();

    extendedTextHeaderDeleteDialog = new ExtendedTextHeaderDeleteDialog();
    expect(await extendedTextHeaderDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.extendedTextHeader.delete.question');
    await extendedTextHeaderDeleteDialog.clickOnConfirmButton();

    expect(await extendedTextHeaderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
