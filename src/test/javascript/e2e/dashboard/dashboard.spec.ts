import { browser, element, by } from 'protractor';
import { NavBarPage, SignInPage } from './../page-objects/jhi-page-objects';

const expect = chai.expect;

describe('dashboard', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    const dashboardMenu = element(by.id('dashboard-menu'));

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
    });

    beforeEach(async () => {
        await dashboardMenu.click();
    });

    it('should load BarChart', async () => {
        await element(by.css('[routerLink="barchart"]')).click();
        const expect1 = 'dashboard.barchart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    it('should load DoughnutChart', async () => {
        await element(by.css('[routerLink="doughnutchart"]')).click();
        const expect1 = 'dashboard.doughnutchart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    it('should load LineChart', async () => {
        await element(by.css('[routerLink="linechart"]')).click();
        const expect1 = 'dashboard.linechart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    it('should load PieChart', async () => {
        await element(by.css('[routerLink="piechart"]')).click();
        const expect1 = 'dashboard.piechart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    it('should load PolarAreaChart', async () => {
        await element(by.css('[routerLink="polarareachart"]')).click();
        const expect1 = 'dashboard.polarareachart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    it('should load RadarChart', async () => {
        await element(by.css('[routerLink="radarchart"]')).click();
        const expect1 = 'dashboard.radarchart.home.title';
        element
            .all(by.css('h2 span'))
            .first()
            .getAttribute('jhiTranslate')
            .then(value => {
                expect(value).to.eq(expect1);
            });
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
