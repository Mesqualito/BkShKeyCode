// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BkencoderComponentsPage, BkencoderDeleteDialog, BkencoderUpdatePage } from './bkencoder.page-object';

const expect = chai.expect;

describe('Bkencoder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bkencoderUpdatePage: BkencoderUpdatePage;
  let bkencoderComponentsPage: BkencoderComponentsPage;
  let bkencoderDeleteDialog: BkencoderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bkencoders', async () => {
    await navBarPage.goToEntity('bkencoder');
    bkencoderComponentsPage = new BkencoderComponentsPage();
    await browser.wait(ec.visibilityOf(bkencoderComponentsPage.title), 5000);
    expect(await bkencoderComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.bkencoder.home.title');
  });

  it('should load create Bkencoder page', async () => {
    await bkencoderComponentsPage.clickOnCreateButton();
    bkencoderUpdatePage = new BkencoderUpdatePage();
    expect(await bkencoderUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.bkencoder.home.createOrEditLabel');
    await bkencoderUpdatePage.cancel();
  });

  it('should create and save Bkencoders', async () => {
    const nbButtonsBeforeCreate = await bkencoderComponentsPage.countDeleteButtons();

    await bkencoderComponentsPage.clickOnCreateButton();
    await promise.all([]);
    await bkencoderUpdatePage.save();
    expect(await bkencoderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bkencoderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bkencoder', async () => {
    const nbButtonsBeforeDelete = await bkencoderComponentsPage.countDeleteButtons();
    await bkencoderComponentsPage.clickOnLastDeleteButton();

    bkencoderDeleteDialog = new BkencoderDeleteDialog();
    expect(await bkencoderDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.bkencoder.delete.question');
    await bkencoderDeleteDialog.clickOnConfirmButton();

    expect(await bkencoderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
