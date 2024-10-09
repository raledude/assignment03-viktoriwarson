import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { simpleFaker } from '@faker-js/faker';

export class BillsCreatePage {
    readonly page: Page;
    readonly valueField: Locator;
    readonly paidCheckbox: Locator;
    readonly saveBtn: Locator;
    readonly backBtn: Locator;
    readonly billHeader: Locator;
    readonly createBillBtn: Locator;
    readonly cardBill: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.valueField = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=number]');
        this.paidCheckbox = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > div');
        this.saveBtn = page.locator('#app > div > div.actions > a.btn.blue');
        this.backBtn = page.locator('#app > div > div.actions > a:nth-child(1)');
        this.billHeader = page.locator('#app > div > h2 > div');
        this.createBillBtn = page.locator('#app > div > h2 > a');
        this.cardBill = page.locator('.card bill');
    }

    async fillRandomPrice() {
        const randomPrice = faker.finance.amount({ min: 1000, max: 10000, dec: 0 });
        await this.valueField.fill(randomPrice);
    }

    async createRandomBills(howMany) {
        for (let i = 0; i < howMany; i++) {
            if (howMany > 20 || howMany < 1) {
                console.log('Can not create more than 20 bills or less than 1');
                break;
            }

            const randomPrice = faker.finance.amount({ min: 1000, max: 10000, dec: 0 })
            await this.createBillBtn.click();
            await this.valueField.fill(randomPrice);
            
            let randomizerNumber = simpleFaker.number.int(1);
            if (randomizerNumber === 1) {
                await this.paidCheckbox.click();
                await this.saveBtn.click(); 
            }
            else {
                await this.saveBtn.click(); 
            }           
          }
    }
}