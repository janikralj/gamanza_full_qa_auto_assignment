import { test } from './fixture/pageFixture';


test.describe('Gamanza full qa challange', () => {
  test('QA Automation Challenge post is visible and contains correct text', async ({ homePage, postPage }) => {
    const postTitleToExpect = 'QA Automation Challenge';
    const postBodyDescToExpect = 'Dockerized testing is the future.';

    // 1. Navigate to homepage
    await homePage.goto();

    // 2. Use search (if exists) for opening post, otherwise click on post by title "QA Automation Challenge"
    if (await homePage.searchExists()) {
      await homePage.searchPost(postTitleToExpect);
    } else {
      await homePage.openPostByTitle(postTitleToExpect);
    }


    // 3. Assert that the post title is visible
    await postPage.assertPostTitle(postTitleToExpect);

    // 4. Assert that the post body contains the required text
    await postPage.assertPostBodyDesc(postBodyDescToExpect);
  });
});