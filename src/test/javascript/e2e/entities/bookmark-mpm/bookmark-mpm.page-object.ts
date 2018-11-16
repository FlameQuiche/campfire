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
    tagsInput = element(by.id('field_tags'));
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

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async setTagsInput(tags) {
        await this.tagsInput.sendKeys(tags);
    }

    async getTagsInput() {
        return this.tagsInput.getAttribute('value');
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
