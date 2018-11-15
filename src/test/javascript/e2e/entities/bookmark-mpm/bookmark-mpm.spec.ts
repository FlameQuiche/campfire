/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BookmarkComponentsPage, BookmarkDeleteDialog, BookmarkUpdatePage } from './bookmark-mpm.page-object';

const expect = chai.expect;

describe('Bookmark e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bookmarkUpdatePage: BookmarkUpdatePage;
    let bookmarkComponentsPage: BookmarkComponentsPage;
    let bookmarkDeleteDialog: BookmarkDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Bookmarks', async () => {
        await navBarPage.goToEntity('bookmark-mpm');
        bookmarkComponentsPage = new BookmarkComponentsPage();
        expect(await bookmarkComponentsPage.getTitle()).to.eq('campFireApp.bookmark.home.title');
    });

    it('should load create Bookmark page', async () => {
        await bookmarkComponentsPage.clickOnCreateButton();
        bookmarkUpdatePage = new BookmarkUpdatePage();
        expect(await bookmarkUpdatePage.getPageTitle()).to.eq('campFireApp.bookmark.home.createOrEditLabel');
        await bookmarkUpdatePage.cancel();
    });

    it('should create and save Bookmarks', async () => {
        const nbButtonsBeforeCreate = await bookmarkComponentsPage.countDeleteButtons();

        await bookmarkComponentsPage.clickOnCreateButton();
        await promise.all([
            bookmarkUpdatePage.setNameInput('name'),
            bookmarkUpdatePage.setUrlInput('url'),
            bookmarkUpdatePage.setTagsInput('tags'),
            bookmarkUpdatePage.teamSelectLastOption()
        ]);
        expect(await bookmarkUpdatePage.getNameInput()).to.eq('name');
        expect(await bookmarkUpdatePage.getUrlInput()).to.eq('url');
        expect(await bookmarkUpdatePage.getTagsInput()).to.eq('tags');
        await bookmarkUpdatePage.save();
        expect(await bookmarkUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bookmarkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Bookmark', async () => {
        const nbButtonsBeforeDelete = await bookmarkComponentsPage.countDeleteButtons();
        await bookmarkComponentsPage.clickOnLastDeleteButton();

        bookmarkDeleteDialog = new BookmarkDeleteDialog();
        expect(await bookmarkDeleteDialog.getDialogTitle()).to.eq('campFireApp.bookmark.delete.question');
        await bookmarkDeleteDialog.clickOnConfirmButton();

        expect(await bookmarkComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
