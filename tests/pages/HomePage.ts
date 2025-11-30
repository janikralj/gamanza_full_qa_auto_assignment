import { Page, Locator } from "@playwright/test";


export class HomePage {
    readonly searchLocator: Locator;
    readonly searchEnter: Locator;

    constructor(private page: Page) {
        this.page = page;

        // this actually does not exists,... improvising
        this.searchLocator = this.page.locator('input[name="Search"]');
        this.searchEnter = this.page.locator('button[name="Enter"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async searchExists() {
        const visible = await this.searchLocator.isVisible();
        return visible;
    }

    async searchPost(title: string) {
        // use search to open post if exists
        await this.searchLocator.fill(title);
        await this.searchEnter.click();
    }

    async openPostByTitle(title: string) {
        const postVisible = await this.page.getByRole('link', { name: title, exact: true }).isVisible();
        if (!postVisible) {
            throw new Error(`Post with title: "${title}", was not found among posts.`);
        }
        await this.page.getByRole('link', { name: title, exact: true }).click();
    }
}