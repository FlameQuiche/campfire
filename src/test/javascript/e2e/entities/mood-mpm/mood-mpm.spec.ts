/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MoodComponentsPage, MoodDeleteDialog, MoodUpdatePage } from './mood-mpm.page-object';

const expect = chai.expect;

describe('Mood e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let moodUpdatePage: MoodUpdatePage;
    let moodComponentsPage: MoodComponentsPage;
    let moodDeleteDialog: MoodDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Moods', async () => {
        await navBarPage.goToEntity('mood-mpm');
        moodComponentsPage = new MoodComponentsPage();
        expect(await moodComponentsPage.getTitle()).to.eq('campFireApp.mood.home.title');
    });

    it('should load create Mood page', async () => {
        await moodComponentsPage.clickOnCreateButton();
        moodUpdatePage = new MoodUpdatePage();
        expect(await moodUpdatePage.getPageTitle()).to.eq('campFireApp.mood.home.createOrEditLabel');
        await moodUpdatePage.cancel();
    });

    it('should create and save Moods', async () => {
        const nbButtonsBeforeCreate = await moodComponentsPage.countDeleteButtons();

        await moodComponentsPage.clickOnCreateButton();
        await promise.all([
            moodUpdatePage.setRankInput('5'),
            moodUpdatePage.setDateInput('2000-12-31'),
            moodUpdatePage.userSelectLastOption(),
            moodUpdatePage.sprintSelectLastOption()
        ]);
        expect(await moodUpdatePage.getRankInput()).to.eq('5');
        expect(await moodUpdatePage.getDateInput()).to.eq('2000-12-31');
        await moodUpdatePage.save();
        expect(await moodUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Mood', async () => {
        const nbButtonsBeforeDelete = await moodComponentsPage.countDeleteButtons();
        await moodComponentsPage.clickOnLastDeleteButton();

        moodDeleteDialog = new MoodDeleteDialog();
        expect(await moodDeleteDialog.getDialogTitle()).to.eq('campFireApp.mood.delete.question');
        await moodDeleteDialog.clickOnConfirmButton();

        expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
