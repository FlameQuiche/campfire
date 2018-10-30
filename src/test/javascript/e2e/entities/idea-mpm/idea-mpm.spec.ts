/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { IdeaComponentsPage, IdeaDeleteDialog, IdeaUpdatePage } from './idea-mpm.page-object';

const expect = chai.expect;

describe('Idea e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ideaUpdatePage: IdeaUpdatePage;
    let ideaComponentsPage: IdeaComponentsPage;
    let ideaDeleteDialog: IdeaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Ideas', async () => {
        await navBarPage.goToEntity('idea-mpm');
        ideaComponentsPage = new IdeaComponentsPage();
        expect(await ideaComponentsPage.getTitle()).to.eq('campFireApp.idea.home.title');
    });

    it('should load create Idea page', async () => {
        await ideaComponentsPage.clickOnCreateButton();
        ideaUpdatePage = new IdeaUpdatePage();
        expect(await ideaUpdatePage.getPageTitle()).to.eq('campFireApp.idea.home.createOrEditLabel');
        await ideaUpdatePage.cancel();
    });

    it('should create and save Ideas', async () => {
        const nbButtonsBeforeCreate = await ideaComponentsPage.countDeleteButtons();

        await ideaComponentsPage.clickOnCreateButton();
        await promise.all([
            ideaUpdatePage.setDescriptionInput('description'),
            ideaUpdatePage.userSelectLastOption(),
            ideaUpdatePage.teamSelectLastOption()
        ]);
        expect(await ideaUpdatePage.getDescriptionInput()).to.eq('description');
        await ideaUpdatePage.save();
        expect(await ideaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ideaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Idea', async () => {
        const nbButtonsBeforeDelete = await ideaComponentsPage.countDeleteButtons();
        await ideaComponentsPage.clickOnLastDeleteButton();

        ideaDeleteDialog = new IdeaDeleteDialog();
        expect(await ideaDeleteDialog.getDialogTitle()).to.eq('campFireApp.idea.delete.question');
        await ideaDeleteDialog.clickOnConfirmButton();

        expect(await ideaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
