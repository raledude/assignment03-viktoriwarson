import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class BillsEditPage {
    readonly page: Page;
    readonly valueField: Locator;
    readonly paidCheckbox: Locator;
    readonly saveBtn: Locator;
    readonly deleteBtn: Locator;
    readonly billHeader: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.deleteBtn = page.locator('#app > div > h2 > a');
        this.valueField = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]');
        this.paidCheckbox = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > div')
        this.saveBtn = page.locator('#app > div > div.actions > a.btn.blue')
        this.billHeader = page.locator('#app > div > h2 > div')
    }

    async fillRandomPrice() {
        const randomPrice = faker.finance.amount({ min: 1000, max: 10000, dec: 0 });
        await this.valueField.fill(randomPrice);
    }
}