import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboard-page';
import { BillsPage } from './pages/bills-page';
import { BillsCreatePage } from './pages/bills-create-page';
import { BillsEditPage } from './pages/bills-edit-page';
import { APIHelper } from './apiHelpers';
import { LoginPage } from './pages/login-page';
import { clients } from './testData';

const BASE_URL = 'http://localhost:3000/api';

test.describe('Test suite backend V1', () => {
  let apiHelper: APIHelper;

  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(BASE_URL);
    const login = await apiHelper.loginRequest(request);
    expect(login.ok()).toBeTruthy();

  })
  test('Test case 01 - Get all clients, GET', async ({ request }) => {

    const getAllClients = await apiHelper.getAllClients(request);
    expect(getAllClients.ok()).toBeTruthy();

  });

  test('Test case 02 - create 5 clients, POST', async ({ request }) => {
    for (const clientPayload of clients) {
      const createPostResponse = await apiHelper.createClient(request, clientPayload);
      expect(createPostResponse.ok()).toBeTruthy();
      const createdClient = await createPostResponse.json();
      console.log('Created client: ', createdClient);
    }
  });
});

test.describe('Frontend Tests 01', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });

  test('Test case 01, create bill', async ({ page }) => {
    const billsPage = new BillsPage(page);
    const billsCreatePage = new BillsCreatePage(page);
    const dashboardPage = new DashboardPage(page);
    const randomBillsCreated = 5;

    await dashboardPage.billsViewBtn.click();

    const numberOfBills = await billsPage.cardBills.count();
    await expect(billsPage.billsHeader).toBeVisible();
    await billsCreatePage.createRandomBills(randomBillsCreated)
    await expect(billsCreatePage.billHeader).toBeVisible();

    const numberOfBillsAfterCreation = await billsPage.cardBills.count();
    await expect(numberOfBills + randomBillsCreated).toEqual(numberOfBillsAfterCreation);
  })
  test('Test case 02, edit bill', async ({ page }) => {
    const billsPage = new BillsPage(page);
    const billsEditPage = new BillsEditPage(page);
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.billsViewBtn.click();
    const firstChildBeforeEdit = await billsPage.firstCreatedBill.allTextContents();
    await expect(billsPage.billsHeader).toBeVisible();

    await billsPage.expandBtn.click();
    await billsPage.editBtn.click();
    await expect(billsEditPage.billHeader).toBeVisible();
    await billsEditPage.fillRandomPrice();
    await billsEditPage.paidCheckbox.click();
    await billsEditPage.saveBtn.click();

    const firstChildAfterEdit = await billsPage.firstCreatedBill.allTextContents();
    await expect(billsPage.billsHeader).toBeVisible();
    await expect(firstChildBeforeEdit).not.toBe(firstChildAfterEdit);
  });
});