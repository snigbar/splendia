import { test, expect } from "@playwright/test";
import path from "path";

const ui_url = "  http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(ui_url);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("12345678");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("login Successful")).toBeVisible();
});

test("should allow users to add hotel", async ({ page }) => {
  await page.goto(ui_url + "add-hotel");

  await page.locator("[name='name']").fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("This is test description");
  await page.locator('[name="pricePerNight"]').fill("5", { force: true });
  await page.selectOption('select[name="starRating"]', "4"),
    await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("5");
  await page.locator('[name="childCount"]').fill("5");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "images/img1.jpg"),
    path.join(__dirname, "images/img2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel saved successfully")).toBeVisible();
});
