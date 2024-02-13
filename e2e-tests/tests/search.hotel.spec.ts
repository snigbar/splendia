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

test("should show hotel detail", async ({ page }) => {
  await page.goto(ui_url);

  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(ui_url);

  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: 5.00$")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill(" 4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Completed!")).toBeVisible();
  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});
