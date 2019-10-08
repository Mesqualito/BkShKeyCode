// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PropPositionComponentsPage, PropPositionDeleteDialog, PropPositionUpdatePage } from './prop-position.page-object';

const expect = chai.expect;

describe('PropPosition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let propPositionUpdatePage: PropPositionUpdatePage;
  let propPositionComponentsPage: PropPositionComponentsPage;
  let propPositionDeleteDialog: PropPositionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PropPositions', async () => {
    await navBarPage.goToEntity('prop-position');
    propPositionComponentsPage = new PropPositionComponentsPage();
    await browser.wait(ec.visibilityOf(propPositionComponentsPage.title), 5000);
    expect(await propPositionComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.propPosition.home.title');
  });

  it('should load create PropPosition page', async () => {
    await propPositionComponentsPage.clickOnCreateButton();
    propPositionUpdatePage = new PropPositionUpdatePage();
    expect(await propPositionUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.propPosition.home.createOrEditLabel');
    await propPositionUpdatePage.cancel();
  });

  it('should create and save PropPositions', async () => {
    const nbButtonsBeforeCreate = await propPositionComponentsPage.countDeleteButtons();

    await propPositionComponentsPage.clickOnCreateButton();
    await promise.all([
      propPositionUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      propPositionUpdatePage.setPosValueInput('5'),
      propPositionUpdatePage.setDescriptionInput('description')
    ]);
    expect(await propPositionUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await propPositionUpdatePage.getPosValueInput()).to.eq('5', 'Expected posValue value to be equals to 5');
    expect(await propPositionUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await propPositionUpdatePage.save();
    expect(await propPositionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await propPositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PropPosition', async () => {
    const nbButtonsBeforeDelete = await propPositionComponentsPage.countDeleteButtons();
    await propPositionComponentsPage.clickOnLastDeleteButton();

    propPositionDeleteDialog = new PropPositionDeleteDialog();
    expect(await propPositionDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.propPosition.delete.question');
    await propPositionDeleteDialog.clickOnConfirmButton();

    expect(await propPositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
