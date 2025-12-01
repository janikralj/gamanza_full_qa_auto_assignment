import { expect, Page, Locator } from "@playwright/test";


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
        console.log("INVESTIGATING on home page -> TITLE TEXT OF POST ON HOME SCREEN -> ", await this.page.getByRole('link', { name: title }).innerHTML()); // POST EXISTS
        console.log("INVESTIGATING on home page -> ATTRIBUT HREF OF THIS POST ELEMENT ON HOME SCREEN -> ", await this.page.getByRole('link', { name: title  }).getAttribute('href'));  // this is "http://localhost:8080/?p=6" and thats why its failing when running inside docker.
        await expect(this.page.getByRole('link', { name: title }), `Post with title ${title}, does not have proper text`).toContainText(title);
        await this.page.getByRole('link', { name: title, exact: true }).click();
    }
}