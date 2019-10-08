// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemSubstitutionComponentsPage, ItemSubstitutionUpdatePage } from './item-substitution.page-object';

const expect = chai.expect;

describe('ItemSubstitution e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemSubstitutionUpdatePage: ItemSubstitutionUpdatePage;
  let itemSubstitutionComponentsPage: ItemSubstitutionComponentsPage;
  /* let itemSubstitutionDeleteDialog: ItemSubstitutionDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemSubstitutions', async () => {
    await navBarPage.goToEntity('item-substitution');
    itemSubstitutionComponentsPage = new ItemSubstitutionComponentsPage();
    await browser.wait(ec.visibilityOf(itemSubstitutionComponentsPage.title), 5000);
    expect(await itemSubstitutionComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.itemSubstitution.home.title');
  });

  it('should load create ItemSubstitution page', async () => {
    await itemSubstitutionComponentsPage.clickOnCreateButton();
    itemSubstitutionUpdatePage = new ItemSubstitutionUpdatePage();
    expect(await itemSubstitutionUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.itemSubstitution.home.createOrEditLabel');
    await itemSubstitutionUpdatePage.cancel();
  });

  /*  it('should create and save ItemSubstitutions', async () => {
        const nbButtonsBeforeCreate = await itemSubstitutionComponentsPage.countDeleteButtons();

        await itemSubstitutionComponentsPage.clickOnCreateButton();
        await promise.all([
            itemSubstitutionUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            itemSubstitutionUpdatePage.setTypeInput('type'),
            itemSubstitutionUpdatePage.setSubstituteTypeInput('substituteType'),
            itemSubstitutionUpdatePage.setSubstituteNoInput('substituteNo'),
            itemSubstitutionUpdatePage.setDescriptionInput('description'),
            itemSubstitutionUpdatePage.setRelationsLevelInput('5'),
            itemSubstitutionUpdatePage.setOrigCheckDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
        ]);
        expect(await itemSubstitutionUpdatePage.getTimestampInput()).to.contain('2001-01-01T02:30', 'Expected timestamp value to be equals to 2000-12-31');
        expect(await itemSubstitutionUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
        expect(await itemSubstitutionUpdatePage.getSubstituteTypeInput()).to.eq('substituteType', 'Expected SubstituteType value to be equals to substituteType');
        expect(await itemSubstitutionUpdatePage.getSubstituteNoInput()).to.eq('substituteNo', 'Expected SubstituteNo value to be equals to substituteNo');
        expect(await itemSubstitutionUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        const selectedIsInterchangeable = itemSubstitutionUpdatePage.getIsInterchangeableInput();
        if (await selectedIsInterchangeable.isSelected()) {
            await itemSubstitutionUpdatePage.getIsInterchangeableInput().click();
            expect(await itemSubstitutionUpdatePage.getIsInterchangeableInput().isSelected(), 'Expected isInterchangeable not to be selected').to.be.false;
        } else {
            await itemSubstitutionUpdatePage.getIsInterchangeableInput().click();
            expect(await itemSubstitutionUpdatePage.getIsInterchangeableInput().isSelected(), 'Expected isInterchangeable to be selected').to.be.true;
        }
        expect(await itemSubstitutionUpdatePage.getRelationsLevelInput()).to.eq('5', 'Expected relationsLevel value to be equals to 5');
        const selectedIsCheckedToOriginal = itemSubstitutionUpdatePage.getIsCheckedToOriginalInput();
        if (await selectedIsCheckedToOriginal.isSelected()) {
            await itemSubstitutionUpdatePage.getIsCheckedToOriginalInput().click();
            expect(await itemSubstitutionUpdatePage.getIsCheckedToOriginalInput().isSelected(), 'Expected isCheckedToOriginal not to be selected').to.be.false;
        } else {
            await itemSubstitutionUpdatePage.getIsCheckedToOriginalInput().click();
            expect(await itemSubstitutionUpdatePage.getIsCheckedToOriginalInput().isSelected(), 'Expected isCheckedToOriginal to be selected').to.be.true;
        }
        expect(await itemSubstitutionUpdatePage.getOrigCheckDateInput()).to.contain('2001-01-01T02:30', 'Expected origCheckDate value to be equals to 2000-12-31');
        await itemSubstitutionUpdatePage.save();
        expect(await itemSubstitutionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await itemSubstitutionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last ItemSubstitution', async () => {
        const nbButtonsBeforeDelete = await itemSubstitutionComponentsPage.countDeleteButtons();
        await itemSubstitutionComponentsPage.clickOnLastDeleteButton();

        itemSubstitutionDeleteDialog = new ItemSubstitutionDeleteDialog();
        expect(await itemSubstitutionDeleteDialog.getDialogTitle())
            .to.eq('bkShKeyCodeApp.itemSubstitution.delete.question');
        await itemSubstitutionDeleteDialog.clickOnConfirmButton();

        expect(await itemSubstitutionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
