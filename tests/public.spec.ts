import { test, expect } from "@playwright/test";
test("public navigation and contact error states remain honest", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Reliable Software",
  );
  await page
    .getByRole("link", { name: "Services", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#services$/);
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Work email").fill("visitor@example.com");
  await page.getByLabel("Service required").selectOption("API Testing");
  await page
    .getByLabel("Project description")
    .fill("I need API testing support for a product launch next month.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("status").first()).not.toContainText("received");
});
test("admin and drafts are not public", async ({ page, request }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  const privateResponse = await request.get("/api/admin/projects");
  expect(privateResponse.status()).not.toBe(200);
  const draft = await request.get("/projects/unpublished-example");
  expect(draft.status()).toBe(404);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("/admin/");
});
test("mobile navigation supports keyboard focus and Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await page.waitForLoadState("networkidle");
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(
    mobileNavigation.getByRole("link", { name: "About", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await expect(toggle).toBeFocused();
});
