import { element, by, ElementFinder } from 'protractor';

export class FolderComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-folder-mpm div table .btn-danger'));
    title = element.all(by.css('jhi-folder-mpm div h2#page-heading span')).first();

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

export class FolderUpdatePage {
    pageTitle = element(by.id('jhi-folder-mpm-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    teamSelect = element(by.id('field_team'));
    subFolderSelect = element(by.id('field_subFolder'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
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

    async subFolderSelectLastOption() {
        await this.subFolderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async subFolderSelectOption(option) {
        await this.subFolderSelect.sendKeys(option);
    }

    getSubFolderSelect(): ElementFinder {
        return this.subFolderSelect;
    }

    async getSubFolderSelectedOption() {
        return this.subFolderSelect.element(by.css('option:checked')).getText();
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

export class FolderDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-folder-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-folder'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
