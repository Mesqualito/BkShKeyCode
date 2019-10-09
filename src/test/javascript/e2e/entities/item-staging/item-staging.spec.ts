// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemStagingComponentsPage, ItemStagingDeleteDialog, ItemStagingUpdatePage } from './item-staging.page-object';

const expect = chai.expect;

describe('ItemStaging e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemStagingUpdatePage: ItemStagingUpdatePage;
  let itemStagingComponentsPage: ItemStagingComponentsPage;
  let itemStagingDeleteDialog: ItemStagingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemStagings', async () => {
    await navBarPage.goToEntity('item-staging');
    itemStagingComponentsPage = new ItemStagingComponentsPage();
    await browser.wait(ec.visibilityOf(itemStagingComponentsPage.title), 5000);
    expect(await itemStagingComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.itemStaging.home.title');
  });

  it('should load create ItemStaging page', async () => {
    await itemStagingComponentsPage.clickOnCreateButton();
    itemStagingUpdatePage = new ItemStagingUpdatePage();
    expect(await itemStagingUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.itemStaging.home.createOrEditLabel');
    await itemStagingUpdatePage.cancel();
  });

  it('should create and save ItemStagings', async () => {
    const nbButtonsBeforeCreate = await itemStagingComponentsPage.countDeleteButtons();

    await itemStagingComponentsPage.clickOnCreateButton();
    await promise.all([itemStagingUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM')]);
    expect(await itemStagingUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    await itemStagingUpdatePage.save();
    expect(await itemStagingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemStagingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemStaging', async () => {
    const nbButtonsBeforeDelete = await itemStagingComponentsPage.countDeleteButtons();
    await itemStagingComponentsPage.clickOnLastDeleteButton();

    itemStagingDeleteDialog = new ItemStagingDeleteDialog();
    expect(await itemStagingDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.itemStaging.delete.question');
    await itemStagingDeleteDialog.clickOnConfirmButton();

    expect(await itemStagingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
