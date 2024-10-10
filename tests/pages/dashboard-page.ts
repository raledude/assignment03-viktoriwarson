import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly clientsViewBtn: Locator;
    readonly billsViewBtn: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' })
        this.clientsViewBtn = page.locator('#app > div > div > div:nth-child(2) > a');
        this.billsViewBtn = page.locator('#app > div > div > div:nth-child(3) > a');
      }
}