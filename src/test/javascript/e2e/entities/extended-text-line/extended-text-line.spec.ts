// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExtendedTextLineComponentsPage, ExtendedTextLineDeleteDialog, ExtendedTextLineUpdatePage } from './extended-text-line.page-object';

const expect = chai.expect;

describe('ExtendedTextLine e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extendedTextLineUpdatePage: ExtendedTextLineUpdatePage;
  let extendedTextLineComponentsPage: ExtendedTextLineComponentsPage;
  let extendedTextLineDeleteDialog: ExtendedTextLineDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ExtendedTextLines', async () => {
    await navBarPage.goToEntity('extended-text-line');
    extendedTextLineComponentsPage = new ExtendedTextLineComponentsPage();
    await browser.wait(ec.visibilityOf(extendedTextLineComponentsPage.title), 5000);
    expect(await extendedTextLineComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.extendedTextLine.home.title');
  });

  it('should load create ExtendedTextLine page', async () => {
    await extendedTextLineComponentsPage.clickOnCreateButton();
    extendedTextLineUpdatePage = new ExtendedTextLineUpdatePage();
    expect(await extendedTextLineUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.extendedTextLine.home.createOrEditLabel');
    await extendedTextLineUpdatePage.cancel();
  });

  it('should create and save ExtendedTextLines', async () => {
    const nbButtonsBeforeCreate = await extendedTextLineComponentsPage.countDeleteButtons();

    await extendedTextLineComponentsPage.clickOnCreateButton();
    await promise.all([
      extendedTextLineUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      extendedTextLineUpdatePage.setTableNameInput('tableName'),
      extendedTextLineUpdatePage.setNoInput('no'),
      extendedTextLineUpdatePage.setTextNoInput('5'),
      extendedTextLineUpdatePage.setLineNoInput('5'),
      extendedTextLineUpdatePage.setTextInput('text'),
      extendedTextLineUpdatePage.textlineSelectLastOption()
    ]);
    expect(await extendedTextLineUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await extendedTextLineUpdatePage.getTableNameInput()).to.eq('tableName', 'Expected TableName value to be equals to tableName');
    expect(await extendedTextLineUpdatePage.getNoInput()).to.eq('no', 'Expected No value to be equals to no');
    expect(await extendedTextLineUpdatePage.getTextNoInput()).to.eq('5', 'Expected textNo value to be equals to 5');
    expect(await extendedTextLineUpdatePage.getLineNoInput()).to.eq('5', 'Expected lineNo value to be equals to 5');
    expect(await extendedTextLineUpdatePage.getTextInput()).to.eq('text', 'Expected Text value to be equals to text');
    await extendedTextLineUpdatePage.save();
    expect(await extendedTextLineUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await extendedTextLineComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ExtendedTextLine', async () => {
    const nbButtonsBeforeDelete = await extendedTextLineComponentsPage.countDeleteButtons();
    await extendedTextLineComponentsPage.clickOnLastDeleteButton();

    extendedTextLineDeleteDialog = new ExtendedTextLineDeleteDialog();
    expect(await extendedTextLineDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.extendedTextLine.delete.question');
    await extendedTextLineDeleteDialog.clickOnConfirmButton();

    expect(await extendedTextLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
