// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemReferenceComponentsPage, ItemReferenceDeleteDialog, ItemReferenceUpdatePage } from './item-reference.page-object';

const expect = chai.expect;

describe('ItemReference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemReferenceUpdatePage: ItemReferenceUpdatePage;
  let itemReferenceComponentsPage: ItemReferenceComponentsPage;
  let itemReferenceDeleteDialog: ItemReferenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemReferences', async () => {
    await navBarPage.goToEntity('item-reference');
    itemReferenceComponentsPage = new ItemReferenceComponentsPage();
    await browser.wait(ec.visibilityOf(itemReferenceComponentsPage.title), 5000);
    expect(await itemReferenceComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.itemReference.home.title');
  });

  it('should load create ItemReference page', async () => {
    await itemReferenceComponentsPage.clickOnCreateButton();
    itemReferenceUpdatePage = new ItemReferenceUpdatePage();
    expect(await itemReferenceUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.itemReference.home.createOrEditLabel');
    await itemReferenceUpdatePage.cancel();
  });

  it('should create and save ItemReferences', async () => {
    const nbButtonsBeforeCreate = await itemReferenceComponentsPage.countDeleteButtons();

    await itemReferenceComponentsPage.clickOnCreateButton();
    await promise.all([
      itemReferenceUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemReferenceUpdatePage.setUomInput('uom'),
      itemReferenceUpdatePage.setCrossReferenceTypeInput('crossReferenceType'),
      itemReferenceUpdatePage.setCrossReferenceTypeNoInput('crossReferenceTypeNo'),
      itemReferenceUpdatePage.setCrossReferenceNoInput('crossReferenceNo'),
      itemReferenceUpdatePage.setDescriptionInput('description'),
      itemReferenceUpdatePage.setQualifierInput('qualifier'),
      itemReferenceUpdatePage.referenceSelectLastOption(),
      itemReferenceUpdatePage.itemSelectLastOption()
    ]);
    expect(await itemReferenceUpdatePage.getTimestampInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timestamp value to be equals to 2000-12-31'
    );
    expect(await itemReferenceUpdatePage.getUomInput()).to.eq('uom', 'Expected Uom value to be equals to uom');
    expect(await itemReferenceUpdatePage.getCrossReferenceTypeInput()).to.eq(
      'crossReferenceType',
      'Expected CrossReferenceType value to be equals to crossReferenceType'
    );
    expect(await itemReferenceUpdatePage.getCrossReferenceTypeNoInput()).to.eq(
      'crossReferenceTypeNo',
      'Expected CrossReferenceTypeNo value to be equals to crossReferenceTypeNo'
    );
    expect(await itemReferenceUpdatePage.getCrossReferenceNoInput()).to.eq(
      'crossReferenceNo',
      'Expected CrossReferenceNo value to be equals to crossReferenceNo'
    );
    expect(await itemReferenceUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await itemReferenceUpdatePage.getQualifierInput()).to.eq('qualifier', 'Expected Qualifier value to be equals to qualifier');
    await itemReferenceUpdatePage.save();
    expect(await itemReferenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemReferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ItemReference', async () => {
    const nbButtonsBeforeDelete = await itemReferenceComponentsPage.countDeleteButtons();
    await itemReferenceComponentsPage.clickOnLastDeleteButton();

    itemReferenceDeleteDialog = new ItemReferenceDeleteDialog();
    expect(await itemReferenceDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.itemReference.delete.question');
    await itemReferenceDeleteDialog.clickOnConfirmButton();

    expect(await itemReferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
