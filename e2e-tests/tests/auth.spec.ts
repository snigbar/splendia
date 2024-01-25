import { test, expect } from "@playwright/test";

const ui_url = "  http://localhost:5173/";

test("should Allow signIn the user", async ({ page }) => {
  await page.goto(ui_url);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("12345678");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("login Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("should allow users to register", async ({ page }) => {
  const randomEmail = `e2e-${Math.floor(1000 + Math.random() * 9000)}@test.com`;
  await page.goto(ui_url);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();
  await page.locator("[name=firstName]").fill("Mr");
  await page.locator("[name=lastName]").fill("Test");
  await page.locator("[name=email]").fill(randomEmail);
  await page.locator("[name=password]").fill("1234test");
  await page.locator("[name=confirmPassword]").fill("1234test");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
