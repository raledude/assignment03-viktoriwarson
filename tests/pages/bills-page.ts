import { expect, type Locator, type Page } from '@playwright/test';

export class BillsPage {
    readonly page: Page;
    readonly expandBtn: Locator;
    readonly editBtn: Locator;
    readonly deleteBtn: Locator;
    readonly createdBills: Locator;
    readonly firstCreatedBill: Locator;
    readonly lastCreatedBill: Locator;
    readonly cardBills: Locator;
    readonly billsHeader: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.expandBtn = page.getByRole('img').first();
        this.editBtn = page.locator('#app > div > div.bills > div > div.menu > a:nth-child(1)');
        this.deleteBtn = page.locator('#app > div > div.bills > div > div.menu > a:nth-child(2)');
        this.createdBills = page.locator('#app > div > div.bills');
        this.firstCreatedBill = page.locator('#app > div > div.bills > div:first-child');
        this.lastCreatedBill = page.locator('#app > div > div.bills > div:last-child');
        this.cardBills = page.locator('#app > div > div.bills > div.card.bill');
        this.billsHeader = page.locator('#app > div > h2 > div');
      }
}