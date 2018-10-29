import { element, by, ElementFinder } from 'protractor';

export class ActionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-action-mpm div table .btn-danger'));
    title = element.all(by.css('jhi-action-mpm div h2#page-heading span')).first();

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

export class ActionUpdatePage {
    pageTitle = element(by.id('jhi-action-mpm-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    responsibleInput = element(by.id('field_responsible'));
    statusSelect = element(by.id('field_status'));
    sprintSelect = element(by.id('field_sprint'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setResponsibleInput(responsible) {
        await this.responsibleInput.sendKeys(responsible);
    }

    async getResponsibleInput() {
        return this.responsibleInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class ActionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-action-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-action'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
