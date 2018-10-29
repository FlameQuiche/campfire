/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeamComponentsPage, TeamDeleteDialog, TeamUpdatePage } from './team-mpm.page-object';

const expect = chai.expect;

describe('Team e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let teamUpdatePage: TeamUpdatePage;
    let teamComponentsPage: TeamComponentsPage;
    let teamDeleteDialog: TeamDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Teams', async () => {
        await navBarPage.goToEntity('team-mpm');
        teamComponentsPage = new TeamComponentsPage();
        expect(await teamComponentsPage.getTitle()).to.eq('campFireApp.team.home.title');
    });

    it('should load create Team page', async () => {
        await teamComponentsPage.clickOnCreateButton();
        teamUpdatePage = new TeamUpdatePage();
        expect(await teamUpdatePage.getPageTitle()).to.eq('campFireApp.team.home.createOrEditLabel');
        await teamUpdatePage.cancel();
    });

    it('should create and save Teams', async () => {
        const nbButtonsBeforeCreate = await teamComponentsPage.countDeleteButtons();

        await teamComponentsPage.clickOnCreateButton();
        await promise.all([teamUpdatePage.setNameInput('name')]);
        expect(await teamUpdatePage.getNameInput()).to.eq('name');
        await teamUpdatePage.save();
        expect(await teamUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await teamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Team', async () => {
        const nbButtonsBeforeDelete = await teamComponentsPage.countDeleteButtons();
        await teamComponentsPage.clickOnLastDeleteButton();

        teamDeleteDialog = new TeamDeleteDialog();
        expect(await teamDeleteDialog.getDialogTitle()).to.eq('campFireApp.team.delete.question');
        await teamDeleteDialog.clickOnConfirmButton();

        expect(await teamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
