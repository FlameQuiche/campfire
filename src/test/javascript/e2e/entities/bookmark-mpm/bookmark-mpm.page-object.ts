import { element, by, ElementFinder } from 'protractor';

export class BookmarkComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-bookmark-mpm div table .btn-danger'));
    title = element.all(by.css('jhi-bookmark-mpm div h2#page-heading span')).first();

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

export class BookmarkUpdatePage {
    pageTitle = element(by.id('jhi-bookmark-mpm-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    urlInput = element(by.id('field_url'));
    folderSelect = element(by.id('field_folder'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async folderSelectLastOption() {
        await this.folderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async folderSelectOption(option) {
        await this.folderSelect.sendKeys(option);
    }

    getFolderSelect(): ElementFinder {
        return this.folderSelect;
    }

    async getFolderSelectedOption() {
        return this.folderSelect.element(by.css('option:checked')).getText();
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

export class BookmarkDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-bookmark-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-bookmark'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
