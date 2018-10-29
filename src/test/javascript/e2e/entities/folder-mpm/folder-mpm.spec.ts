/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FolderComponentsPage, FolderDeleteDialog, FolderUpdatePage } from './folder-mpm.page-object';

const expect = chai.expect;

describe('Folder e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let folderUpdatePage: FolderUpdatePage;
    let folderComponentsPage: FolderComponentsPage;
    let folderDeleteDialog: FolderDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Folders', async () => {
        await navBarPage.goToEntity('folder-mpm');
        folderComponentsPage = new FolderComponentsPage();
        expect(await folderComponentsPage.getTitle()).to.eq('campFireApp.folder.home.title');
    });

    it('should load create Folder page', async () => {
        await folderComponentsPage.clickOnCreateButton();
        folderUpdatePage = new FolderUpdatePage();
        expect(await folderUpdatePage.getPageTitle()).to.eq('campFireApp.folder.home.createOrEditLabel');
        await folderUpdatePage.cancel();
    });

    it('should create and save Folders', async () => {
        const nbButtonsBeforeCreate = await folderComponentsPage.countDeleteButtons();

        await folderComponentsPage.clickOnCreateButton();
        await promise.all([
            folderUpdatePage.setNameInput('name'),
            folderUpdatePage.teamSelectLastOption()
            // folderUpdatePage.subFolderSelectLastOption(),
        ]);
        expect(await folderUpdatePage.getNameInput()).to.eq('name');
        await folderUpdatePage.save();
        expect(await folderUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await folderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Folder', async () => {
        const nbButtonsBeforeDelete = await folderComponentsPage.countDeleteButtons();
        await folderComponentsPage.clickOnLastDeleteButton();

        folderDeleteDialog = new FolderDeleteDialog();
        expect(await folderDeleteDialog.getDialogTitle()).to.eq('campFireApp.folder.delete.question');
        await folderDeleteDialog.clickOnConfirmButton();

        expect(await folderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
