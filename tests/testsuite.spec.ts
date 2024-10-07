import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { LoginPage } from './pages/login-page';

test.beforeAll(async () => {
  await exec(`docker run --name testerhotel -d -p 3000:3000 my-vue-app`)
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

test.afterAll(async () => {
  // Adding this to wipe out the data
  exec(`docker restart testerhotel`)
});


test.describe('Frontend Tests 01', () => { 
  test('has title', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
  });


})

test.describe('Backend Tests 01', () => {
  test('has title', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
  });

  
})