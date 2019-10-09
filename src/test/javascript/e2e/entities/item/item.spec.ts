// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemComponentsPage, ItemDeleteDialog, ItemUpdatePage } from './item.page-object';

const expect = chai.expect;

describe('Item e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemUpdatePage: ItemUpdatePage;
  let itemComponentsPage: ItemComponentsPage;
  let itemDeleteDialog: ItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Items', async () => {
    await navBarPage.goToEntity('item');
    itemComponentsPage = new ItemComponentsPage();
    await browser.wait(ec.visibilityOf(itemComponentsPage.title), 5000);
    expect(await itemComponentsPage.getTitle()).to.eq('bkShKeyCodeApp.item.home.title');
  });

  it('should load create Item page', async () => {
    await itemComponentsPage.clickOnCreateButton();
    itemUpdatePage = new ItemUpdatePage();
    expect(await itemUpdatePage.getPageTitle()).to.eq('bkShKeyCodeApp.item.home.createOrEditLabel');
    await itemUpdatePage.cancel();
  });

  it('should create and save Items', async () => {
    const nbButtonsBeforeCreate = await itemComponentsPage.countDeleteButtons();

    await itemComponentsPage.clickOnCreateButton();
    await promise.all([
      itemUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemUpdatePage.setModificationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      itemUpdatePage.setNoInput('no'),
      itemUpdatePage.setNo2Input('no2'),
      itemUpdatePage.setNameInput('name'),
      itemUpdatePage.setBuomInput('buom'),
      itemUpdatePage.setUnitPriceInput('5'),
      itemUpdatePage.setNetWeightInput('5'),
      itemUpdatePage.setHsNoInput('hsNo'),
      itemUpdatePage.setHsDescriptionInput('hsDescription'),
      itemUpdatePage.setHsCommentInput('hsComment'),
      itemUpdatePage.setSuomInput('suom'),
      itemUpdatePage.setItemCategoryCodeInput('itemCategoryCode'),
      itemUpdatePage.setProductGroupCodeInput('productGroupCode'),
      itemUpdatePage.setWsCategory3CodeInput('wsCategory3Code'),
      itemUpdatePage.setApplicationKindInput('applicationKind'),
      itemUpdatePage.setStrapTypeInput('strapType'),
      itemUpdatePage.setSealTypeInput('sealType'),
      itemUpdatePage.setDriveTypeInput('driveType'),
      itemUpdatePage.setStrapTensionMaxInput('5'),
      itemUpdatePage.setStrapWidthInput('strapWidth'),
      itemUpdatePage.setStrappingsPerDayInput('5'),
      itemUpdatePage.setAkkuTypeInput('akkuType'),
      itemUpdatePage.setAkkuBrandInput('akkuBrand'),
      itemUpdatePage.setAkkuCapacitiyInput('5'),
      itemUpdatePage.setAkkuVoltageInput('5'),
      itemUpdatePage.setSealFixityInput('5'),
      itemUpdatePage.setSpeedInput('5'),
      itemUpdatePage.setMotorsInput('5'),
      itemUpdatePage.setStrapThicknessMinInput('5'),
      itemUpdatePage.setStrapThicknessMaxInput('5')
      // itemUpdatePage.substNoSelectLastOption(),
    ]);
    expect(await itemUpdatePage.getTimestampInput()).to.contain('2001-01-01T02:30', 'Expected timestamp value to be equals to 2000-12-31');
    expect(await itemUpdatePage.getModificationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modificationDate value to be equals to 2000-12-31'
    );
    expect(await itemUpdatePage.getNoInput()).to.eq('no', 'Expected No value to be equals to no');
    expect(await itemUpdatePage.getNo2Input()).to.eq('no2', 'Expected No2 value to be equals to no2');
    expect(await itemUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await itemUpdatePage.getBuomInput()).to.eq('buom', 'Expected Buom value to be equals to buom');
    expect(await itemUpdatePage.getUnitPriceInput()).to.eq('5', 'Expected unitPrice value to be equals to 5');
    expect(await itemUpdatePage.getNetWeightInput()).to.eq('5', 'Expected netWeight value to be equals to 5');
    expect(await itemUpdatePage.getHsNoInput()).to.eq('hsNo', 'Expected HsNo value to be equals to hsNo');
    expect(await itemUpdatePage.getHsDescriptionInput()).to.eq(
      'hsDescription',
      'Expected HsDescription value to be equals to hsDescription'
    );
    expect(await itemUpdatePage.getHsCommentInput()).to.eq('hsComment', 'Expected HsComment value to be equals to hsComment');
    const selectedIsBlocked = itemUpdatePage.getIsBlockedInput();
    if (await selectedIsBlocked.isSelected()) {
      await itemUpdatePage.getIsBlockedInput().click();
      expect(await itemUpdatePage.getIsBlockedInput().isSelected(), 'Expected isBlocked not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsBlockedInput().click();
      expect(await itemUpdatePage.getIsBlockedInput().isSelected(), 'Expected isBlocked to be selected').to.be.true;
    }
    expect(await itemUpdatePage.getSuomInput()).to.eq('suom', 'Expected Suom value to be equals to suom');
    expect(await itemUpdatePage.getItemCategoryCodeInput()).to.eq(
      'itemCategoryCode',
      'Expected ItemCategoryCode value to be equals to itemCategoryCode'
    );
    expect(await itemUpdatePage.getProductGroupCodeInput()).to.eq(
      'productGroupCode',
      'Expected ProductGroupCode value to be equals to productGroupCode'
    );
    expect(await itemUpdatePage.getWsCategory3CodeInput()).to.eq(
      'wsCategory3Code',
      'Expected WsCategory3Code value to be equals to wsCategory3Code'
    );
    const selectedIsGTIN = itemUpdatePage.getIsGTINInput();
    if (await selectedIsGTIN.isSelected()) {
      await itemUpdatePage.getIsGTINInput().click();
      expect(await itemUpdatePage.getIsGTINInput().isSelected(), 'Expected isGTIN not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsGTINInput().click();
      expect(await itemUpdatePage.getIsGTINInput().isSelected(), 'Expected isGTIN to be selected').to.be.true;
    }
    const selectedIsOnlySpareparts = itemUpdatePage.getIsOnlySparepartsInput();
    if (await selectedIsOnlySpareparts.isSelected()) {
      await itemUpdatePage.getIsOnlySparepartsInput().click();
      expect(await itemUpdatePage.getIsOnlySparepartsInput().isSelected(), 'Expected isOnlySpareparts not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsOnlySparepartsInput().click();
      expect(await itemUpdatePage.getIsOnlySparepartsInput().isSelected(), 'Expected isOnlySpareparts to be selected').to.be.true;
    }
    const selectedIsUsedForWebshop = itemUpdatePage.getIsUsedForWebshopInput();
    if (await selectedIsUsedForWebshop.isSelected()) {
      await itemUpdatePage.getIsUsedForWebshopInput().click();
      expect(await itemUpdatePage.getIsUsedForWebshopInput().isSelected(), 'Expected isUsedForWebshop not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsUsedForWebshopInput().click();
      expect(await itemUpdatePage.getIsUsedForWebshopInput().isSelected(), 'Expected isUsedForWebshop to be selected').to.be.true;
    }
    expect(await itemUpdatePage.getApplicationKindInput()).to.eq(
      'applicationKind',
      'Expected ApplicationKind value to be equals to applicationKind'
    );
    expect(await itemUpdatePage.getStrapTypeInput()).to.eq('strapType', 'Expected StrapType value to be equals to strapType');
    expect(await itemUpdatePage.getSealTypeInput()).to.eq('sealType', 'Expected SealType value to be equals to sealType');
    expect(await itemUpdatePage.getDriveTypeInput()).to.eq('driveType', 'Expected DriveType value to be equals to driveType');
    expect(await itemUpdatePage.getStrapTensionMaxInput()).to.eq('5', 'Expected strapTensionMax value to be equals to 5');
    expect(await itemUpdatePage.getStrapWidthInput()).to.eq('strapWidth', 'Expected StrapWidth value to be equals to strapWidth');
    expect(await itemUpdatePage.getStrappingsPerDayInput()).to.eq('5', 'Expected strappingsPerDay value to be equals to 5');
    expect(await itemUpdatePage.getAkkuTypeInput()).to.eq('akkuType', 'Expected AkkuType value to be equals to akkuType');
    expect(await itemUpdatePage.getAkkuBrandInput()).to.eq('akkuBrand', 'Expected AkkuBrand value to be equals to akkuBrand');
    expect(await itemUpdatePage.getAkkuCapacitiyInput()).to.eq('5', 'Expected akkuCapacitiy value to be equals to 5');
    expect(await itemUpdatePage.getAkkuVoltageInput()).to.eq('5', 'Expected akkuVoltage value to be equals to 5');
    expect(await itemUpdatePage.getSealFixityInput()).to.eq('5', 'Expected sealFixity value to be equals to 5');
    expect(await itemUpdatePage.getSpeedInput()).to.eq('5', 'Expected speed value to be equals to 5');
    expect(await itemUpdatePage.getMotorsInput()).to.eq('5', 'Expected motors value to be equals to 5');
    expect(await itemUpdatePage.getStrapThicknessMinInput()).to.eq('5', 'Expected strapThicknessMin value to be equals to 5');
    expect(await itemUpdatePage.getStrapThicknessMaxInput()).to.eq('5', 'Expected strapThicknessMax value to be equals to 5');
    const selectedIsInProductFinder = itemUpdatePage.getIsInProductFinderInput();
    if (await selectedIsInProductFinder.isSelected()) {
      await itemUpdatePage.getIsInProductFinderInput().click();
      expect(await itemUpdatePage.getIsInProductFinderInput().isSelected(), 'Expected isInProductFinder not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsInProductFinderInput().click();
      expect(await itemUpdatePage.getIsInProductFinderInput().isSelected(), 'Expected isInProductFinder to be selected').to.be.true;
    }
    const selectedIsFullyAutomaticTension = itemUpdatePage.getIsFullyAutomaticTensionInput();
    if (await selectedIsFullyAutomaticTension.isSelected()) {
      await itemUpdatePage.getIsFullyAutomaticTensionInput().click();
      expect(await itemUpdatePage.getIsFullyAutomaticTensionInput().isSelected(), 'Expected isFullyAutomaticTension not to be selected').to
        .be.false;
    } else {
      await itemUpdatePage.getIsFullyAutomaticTensionInput().click();
      expect(await itemUpdatePage.getIsFullyAutomaticTensionInput().isSelected(), 'Expected isFullyAutomaticTension to be selected').to.be
        .true;
    }
    const selectedIsWeldingByButton = itemUpdatePage.getIsWeldingByButtonInput();
    if (await selectedIsWeldingByButton.isSelected()) {
      await itemUpdatePage.getIsWeldingByButtonInput().click();
      expect(await itemUpdatePage.getIsWeldingByButtonInput().isSelected(), 'Expected isWeldingByButton not to be selected').to.be.false;
    } else {
      await itemUpdatePage.getIsWeldingByButtonInput().click();
      expect(await itemUpdatePage.getIsWeldingByButtonInput().isSelected(), 'Expected isWeldingByButton to be selected').to.be.true;
    }
    await itemUpdatePage.save();
    expect(await itemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Item', async () => {
    const nbButtonsBeforeDelete = await itemComponentsPage.countDeleteButtons();
    await itemComponentsPage.clickOnLastDeleteButton();

    itemDeleteDialog = new ItemDeleteDialog();
    expect(await itemDeleteDialog.getDialogTitle()).to.eq('bkShKeyCodeApp.item.delete.question');
    await itemDeleteDialog.clickOnConfirmButton();

    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
