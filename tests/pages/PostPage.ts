import { expect, Locator, Page } from "@playwright/test";


export class PostPage {
    readonly postTitleLocator: Locator;
    readonly postBodyLocator: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.postTitleLocator = this.page.locator('h1.wp-block-post-title');
        this.postBodyLocator = this.page.locator('div.entry-content');
    }

    async assertPostTitle (title: string){
        console.log("INVESTIGATING on post page -> FOR URL AFTER CLICKING ON POST ->", await this.page.url());
        await expect(this.postTitleLocator, `Post with title ${title}, is not visible`).toBeVisible();
        await expect(this.postTitleLocator, `Post with title ${title}, does not have proper text`).toHaveText(title);
    }

    async assertPostBodyDesc(body: string){
        await expect(this.postBodyLocator, `Post with body ${body}, is not visible`).toBeVisible();
        await expect(this.postBodyLocator, `Post with body ${body}, does not have proper text`).toContainText(body);
    }
}