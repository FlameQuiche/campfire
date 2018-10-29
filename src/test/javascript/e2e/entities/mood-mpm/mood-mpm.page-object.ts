import { element, by, ElementFinder } from 'protractor';

export class MoodComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-mood-mpm div table .btn-danger'));
    title = element.all(by.css('jhi-mood-mpm div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MoodUpdatePage {
    pageTitle = element(by.id('jhi-mood-mpm-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    rankInput = element(by.id('field_rank'));
    dateInput = element(by.id('field_date'));
    userSelect = element(by.id('field_user'));
    sprintSelect = element(by.id('field_sprint'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRankInput(rank) {
        await this.rankInput.sendKeys(rank);
    }

    async getRankInput() {
        return this.rankInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async sprintSelectLastOption() {
        await this.sprintSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sprintSelectOption(option) {
        await this.sprintSelect.sendKeys(option);
    }

    getSprintSelect(): ElementFinder {
        return this.sprintSelect;
    }

    async getSprintSelectedOption() {
        return this.sprintSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class MoodDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mood-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mood'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
