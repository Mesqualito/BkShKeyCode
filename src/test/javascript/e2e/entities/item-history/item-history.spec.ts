// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemHistoryComponentsPage, ItemHistoryDeleteDialog, ItemHistoryUpdatePage } from './item-history.page-object';

const expect = chai.expect;

describe('ItemHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemHistoryUpdatePage: ItemHistoryUpdatePage;
  let itemHistoryComponentsPage: ItemHistoryComponentsPage;
  let itemHistoryDeleteDialog: ItemHistoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemHistories', async () => {
    await navBarPage.goToEntity('item-history');
    itemHistoryComponentsPage = new ItemHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(itemHistoryComponentsPage.title), 5000);
    expect(await itemHistoryComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.itemHistory.home.title');
  });

  it('should load create ItemHistory page', async () => {
    await itemHistoryComponentsPage.clickOnCreateButton();
    itemHistoryUpdatePage = new ItemHistoryUpdatePage();
    expect(await itemHistoryUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.itemHistory.home.createOrEditLabel');
    await itemHistoryUpdatePage.cancel();
  });

  it('should create and save ItemHistories', async () => {
    const nbButtonsBeforeCreate = await itemHistoryComponentsPage.countDeleteButtons();

    await itemHistoryComponentsPage.clickOnCreateButton();
    await promise.all([
      itemHistoryUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemHistoryUpdatePage.setModificationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemHistoryUpdatePage.itemSelectLastOption()
    ]);
    expect(await itemHistoryUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await itemHistoryUpdatePage.getModificationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modificationDate value to be equals to 2000-12-31'
    );
    const selectedModified = itemHistoryUpdatePage.getModifiedInput();
    if (await selectedModified.isSelected()) {
      await itemHistoryUpdatePage.getModifiedInput().click();
      expect(await itemHistoryUpdatePage.getModifiedInput().isSelected(), 'Expected modified not to be selected').to.be.false;
    } else {
      await itemHistoryUpdatePage.getModifiedInput().click();
      expect(await itemHistoryUpdatePage.getModifiedInput().isSelected(), 'Expected modified to be selected').to.be.true;
    }
    await itemHistoryUpdatePage.save();
    expect(await itemHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemHistory', async () => {
    const nbButtonsBeforeDelete = await itemHistoryComponentsPage.countDeleteButtons();
    await itemHistoryComponentsPage.clickOnLastDeleteButton();

    itemHistoryDeleteDialog = new ItemHistoryDeleteDialog();
    expect(await itemHistoryDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.itemHistory.delete.question');
    await itemHistoryDeleteDialog.clickOnConfirmButton();

    expect(await itemHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
