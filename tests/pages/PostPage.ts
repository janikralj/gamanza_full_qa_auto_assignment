import { expect, Locator, Page } from "@playwright/test";


export class PostPage {
    readonly postTitleLocator: Locator;
    readonly postBodyLocator: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.postTitleLocator = this.page.locator('h1.wp-block-post-title');
        this.postBodyLocator = this.page.locator('div.entry-content');
    }

    async assertPageTitle (title: string){
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertPostTitle (title: string){
        await expect(this.postTitleLocator).toBeVisible();
        await expect(this.postTitleLocator).toHaveText(title);
    }

    async assertPostBodyDesc(body: string){
        await expect(this.postBodyLocator).toBeVisible();
        await expect(this.postBodyLocator).toContainText(body);
    }
}