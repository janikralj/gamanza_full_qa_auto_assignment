// fixtures.ts
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PostPage } from '../pages/PostPage';

// 1. Define the type for the shared object
type MyFixtures = {
  homePage: HomePage;
  postPage: PostPage
};

// 2. Extend the base test with your new fixture
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
    // Optional: Add any teardown logic here
  },
  postPage: async ({ page }, use) => {
    await use(new PostPage(page));
    // Optional: Add any teardown logic here
  }
});

export { expect, Locator } from '@playwright/test';