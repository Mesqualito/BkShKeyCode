// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UomComponentsPage, UomDeleteDialog, UomUpdatePage } from './uom.page-object';

const expect = chai.expect;

describe('Uom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uomUpdatePage: UomUpdatePage;
  let uomComponentsPage: UomComponentsPage;
  let uomDeleteDialog: UomDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Uoms', async () => {
    await navBarPage.goToEntity('uom');
    uomComponentsPage = new UomComponentsPage();
    await browser.wait(ec.visibilityOf(uomComponentsPage.title), 5000);
    expect(await uomComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.uom.home.title');
  });

  it('should load create Uom page', async () => {
    await uomComponentsPage.clickOnCreateButton();
    uomUpdatePage = new UomUpdatePage();
    expect(await uomUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.uom.home.createOrEditLabel');
    await uomUpdatePage.cancel();
  });

  it('should create and save Uoms', async () => {
    const nbButtonsBeforeCreate = await uomComponentsPage.countDeleteButtons();

    await uomComponentsPage.clickOnCreateButton();
    await promise.all([
      uomUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      uomUpdatePage.setModificationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      uomUpdatePage.setRankInput('5'),
      uomUpdatePage.setCodeInput('code'),
      uomUpdatePage.setDescriptionInput('description'),
      uomUpdatePage.setFactorInput('5')
    ]);
    expect(await uomUpdatePage.getTimestampInput()).to.contain('2001-01-01T02:30', 'Expected timestamp value to be equals to 2000-12-31');
    expect(await uomUpdatePage.getModificationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modificationDate value to be equals to 2000-12-31'
    );
    expect(await uomUpdatePage.getRankInput()).to.eq('5', 'Expected rank value to be equals to 5');
    expect(await uomUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await uomUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await uomUpdatePage.getFactorInput()).to.eq('5', 'Expected factor value to be equals to 5');
    await uomUpdatePage.save();
    expect(await uomUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await uomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Uom', async () => {
    const nbButtonsBeforeDelete = await uomComponentsPage.countDeleteButtons();
    await uomComponentsPage.clickOnLastDeleteButton();

    uomDeleteDialog = new UomDeleteDialog();
    expect(await uomDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.uom.delete.question');
    await uomDeleteDialog.clickOnConfirmButton();

    expect(await uomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
