import { expect, test } from "@playwright/test";

const ui_url = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(ui_url);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("12345678");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("login Successful")).toBeVisible();
});

test("should allow search hotel", async ({ page }) => {
  await page.goto(ui_url);
  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Test City")).toBeVisible();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});
