import { test, expect, Locator } from "@playwright/test";

test("User login to ParaBank", async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await expect(page).toHaveTitle(/ParaBank | Welcome | Online Banking/);
}
)

test("User navigates to registration page", async ({ page }) => {
    // test.setTimeout(120_000);
    // const registerLink = page.getByRole("link", { name: "Register" });
    // test.setTimeout(120_000);
    // await expect(registerLink).toBeVisible();
    // test.setTimeout(120_000);
    // await registerLink.click();

    await page.goto("https://parabank.parasoft.com/parabank/register.htm");
    let urlTitle: string = await page.title();
    console.log(urlTitle);
    await expect(page).toHaveTitle(/ParaBank | Register for Free Online Account Access/);

    const bankLogo: Locator = page.getByAltText("ParaBank");
    await expect(bankLogo).toBeVisible();
})

test("User enters registration details and submits the form", async ({ page }) => {
    await page.getByRole("row", {name:'First Name:'}).fill("Jhon");
})