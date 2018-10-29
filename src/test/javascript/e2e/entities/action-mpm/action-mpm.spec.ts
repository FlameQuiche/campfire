/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActionComponentsPage, ActionDeleteDialog, ActionUpdatePage } from './action-mpm.page-object';

const expect = chai.expect;

describe('Action e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let actionUpdatePage: ActionUpdatePage;
    let actionComponentsPage: ActionComponentsPage;
    let actionDeleteDialog: ActionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Actions', async () => {
        await navBarPage.goToEntity('action-mpm');
        actionComponentsPage = new ActionComponentsPage();
        expect(await actionComponentsPage.getTitle()).to.eq('campFireApp.action.home.title');
    });

    it('should load create Action page', async () => {
        await actionComponentsPage.clickOnCreateButton();
        actionUpdatePage = new ActionUpdatePage();
        expect(await actionUpdatePage.getPageTitle()).to.eq('campFireApp.action.home.createOrEditLabel');
        await actionUpdatePage.cancel();
    });

    it('should create and save Actions', async () => {
        const nbButtonsBeforeCreate = await actionComponentsPage.countDeleteButtons();

        await actionComponentsPage.clickOnCreateButton();
        await promise.all([
            actionUpdatePage.setDescriptionInput('description'),
            actionUpdatePage.setResponsibleInput('responsible'),
            actionUpdatePage.statusSelectLastOption(),
            actionUpdatePage.sprintSelectLastOption()
        ]);
        expect(await actionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await actionUpdatePage.getResponsibleInput()).to.eq('responsible');
        await actionUpdatePage.save();
        expect(await actionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await actionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Action', async () => {
        const nbButtonsBeforeDelete = await actionComponentsPage.countDeleteButtons();
        await actionComponentsPage.clickOnLastDeleteButton();

        actionDeleteDialog = new ActionDeleteDialog();
        expect(await actionDeleteDialog.getDialogTitle()).to.eq('campFireApp.action.delete.question');
        await actionDeleteDialog.clickOnConfirmButton();

        expect(await actionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
