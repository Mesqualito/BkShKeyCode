// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RankComponentsPage, RankDeleteDialog, RankUpdatePage } from './rank.page-object';

const expect = chai.expect;

describe('Rank e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rankUpdatePage: RankUpdatePage;
  let rankComponentsPage: RankComponentsPage;
  let rankDeleteDialog: RankDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ranks', async () => {
    await navBarPage.goToEntity('rank');
    rankComponentsPage = new RankComponentsPage();
    await browser.wait(ec.visibilityOf(rankComponentsPage.title), 5000);
    expect(await rankComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.rank.home.title');
  });

  it('should load create Rank page', async () => {
    await rankComponentsPage.clickOnCreateButton();
    rankUpdatePage = new RankUpdatePage();
    expect(await rankUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.rank.home.createOrEditLabel');
    await rankUpdatePage.cancel();
  });

  it('should create and save Ranks', async () => {
    const nbButtonsBeforeCreate = await rankComponentsPage.countDeleteButtons();

    await rankComponentsPage.clickOnCreateButton();
    await promise.all([
      rankUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rankUpdatePage.setPrioValueInput('5')
    ]);
    expect(await rankUpdatePage.getTimestampInput()).to.contain('2001-01-01T02:30', 'Expected timestamp value to be equals to 2000-12-31');
    expect(await rankUpdatePage.getPrioValueInput()).to.eq('5', 'Expected prioValue value to be equals to 5');
    await rankUpdatePage.save();
    expect(await rankUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Rank', async () => {
    const nbButtonsBeforeDelete = await rankComponentsPage.countDeleteButtons();
    await rankComponentsPage.clickOnLastDeleteButton();

    rankDeleteDialog = new RankDeleteDialog();
    expect(await rankDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.rank.delete.question');
    await rankDeleteDialog.clickOnConfirmButton();

    expect(await rankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
