import { element, by, ElementFinder } from 'protractor';

export class SprintComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-sprint-mpm div table .btn-danger'));
    title = element.all(by.css('jhi-sprint-mpm div h2#page-heading span')).first();

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

export class SprintUpdatePage {
    pageTitle = element(by.id('jhi-sprint-mpm-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    beginDateInput = element(by.id('field_beginDate'));
    endDateInput = element(by.id('field_endDate'));
    teamSelect = element(by.id('field_team'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setBeginDateInput(beginDate) {
        await this.beginDateInput.sendKeys(beginDate);
    }

    async getBeginDateInput() {
        return this.beginDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    async teamSelectLastOption() {
        await this.teamSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async teamSelectOption(option) {
        await this.teamSelect.sendKeys(option);
    }

    getTeamSelect(): ElementFinder {
        return this.teamSelect;
    }

    async getTeamSelectedOption() {
        return this.teamSelect.element(by.css('option:checked')).getText();
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

export class SprintDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-sprint-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-sprint'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
