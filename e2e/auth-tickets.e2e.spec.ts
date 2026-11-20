import { expect, test } from "@playwright/test";

const E2E_EMAIL =
  process.env.E2E_USER_EMAIL || "it.dannybizman@gmail.com";
const E2E_PASSWORD = process.env.E2E_USER_PASSWORD || "Anticode@93";

test.describe("Wizolingo E2E: Auth, GuestGuard, Dashboard & Ticket Verification", () => {
  test("shows inline validation errors on empty login submit", async ({
    page,
  }) => {
    await page.goto("/login", { waitUntil: "load" });
    await page.getByRole("button", { name: /log in/i }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("logs in, redirects to dashboard without public navbar/footer, guards /login, and renders downloadable tickets", async ({
    page,
  }) => {
    test.slow();
    await page.goto("/login", { waitUntil: "load" });

    await page.locator("#login-email").fill(E2E_EMAIL);
    await page.locator("#login-password").fill(E2E_PASSWORD);
    await page.getByRole("button", { name: /log in/i }).click();

    await page.waitForURL(/\/dashboard/, {
      waitUntil: "commit",
      timeout: 25_000,
    });
    await expect(page).toHaveURL(/\/dashboard/);

    // Authenticated pages must not show public Footer or public STORE nav link
    await expect(
      page.getByText(/subscribe to the newsletter/i)
    ).toHaveCount(0);

    // Visiting /login while authenticated must redirect back to /dashboard
    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await page.waitForURL(/\/dashboard/, {
      waitUntil: "commit",
      timeout: 20_000,
    });

    // Navigate to Order Management and check ticket pass if present
    await page.goto("/order-management", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/order history/i)).toBeVisible({
      timeout: 30_000,
    });

    const verifyLinks = page.getByRole("link", { name: /verify status/i });
    const ticketCount = await verifyLinks.count();
    if (ticketCount > 0) {
      await expect(
        page.getByRole("button", { name: /download png/i }).first()
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /download jpg/i }).first()
      ).toBeVisible();

      const verifyHref = await verifyLinks.first().getAttribute("href");
      if (verifyHref) {
        await page.goto(verifyHref);
        await expect(
          page.getByText(/wiz ofuasia ticket verification/i)
        ).toBeVisible({ timeout: 15_000 });
        await expect(
          page.getByText(/subscribe to the newsletter/i)
        ).toHaveCount(0);

        const backBtn = page.getByRole("link", {
          name: /go back to your dashboard/i,
        });
        await expect(backBtn).toBeVisible();
        await backBtn.click();
        await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
      }
    }
  });
});

