// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LanguageComponentsPage, LanguageDeleteDialog, LanguageUpdatePage } from './language.page-object';

const expect = chai.expect;

describe('Language e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let languageUpdatePage: LanguageUpdatePage;
  let languageComponentsPage: LanguageComponentsPage;
  let languageDeleteDialog: LanguageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Languages', async () => {
    await navBarPage.goToEntity('language');
    languageComponentsPage = new LanguageComponentsPage();
    await browser.wait(ec.visibilityOf(languageComponentsPage.title), 5000);
    expect(await languageComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.language.home.title');
  });

  it('should load create Language page', async () => {
    await languageComponentsPage.clickOnCreateButton();
    languageUpdatePage = new LanguageUpdatePage();
    expect(await languageUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.language.home.createOrEditLabel');
    await languageUpdatePage.cancel();
  });

  it('should create and save Languages', async () => {
    const nbButtonsBeforeCreate = await languageComponentsPage.countDeleteButtons();

    await languageComponentsPage.clickOnCreateButton();
    await promise.all([
      languageUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      languageUpdatePage.setCodeInput('code'),
      languageUpdatePage.setNameInput('name'),
      languageUpdatePage.setIso3166Alpha2Input('iso3166Alpha2'),
      languageUpdatePage.setIso3166Alpha3Input('iso3166Alpha3')
    ]);
    expect(await languageUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await languageUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await languageUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await languageUpdatePage.getIso3166Alpha2Input()).to.eq(
      'iso3166Alpha2',
      'Expected Iso3166Alpha2 value to be equals to iso3166Alpha2'
    );
    expect(await languageUpdatePage.getIso3166Alpha3Input()).to.eq(
      'iso3166Alpha3',
      'Expected Iso3166Alpha3 value to be equals to iso3166Alpha3'
    );
    await languageUpdatePage.save();
    expect(await languageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Language', async () => {
    const nbButtonsBeforeDelete = await languageComponentsPage.countDeleteButtons();
    await languageComponentsPage.clickOnLastDeleteButton();

    languageDeleteDialog = new LanguageDeleteDialog();
    expect(await languageDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.language.delete.question');
    await languageDeleteDialog.clickOnConfirmButton();

    expect(await languageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
