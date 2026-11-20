import { expect, test, type Page } from "@playwright/test";

const E2E_EMAIL =
  process.env.E2E_USER_EMAIL || "it.dannybizman@gmail.com";
const E2E_PASSWORD = process.env.E2E_USER_PASSWORD || "Anticode@93";

const MAX_CLICK_TO_PAINT_MS = 200; // Google Web Vitals INP "Good" threshold
const MAX_POST_RESPONSE_FEEDBACK_MS = 500; // Instant loader/redirect feedback after API resolves

async function installClickPaintProbe(page: Page) {
  await page.evaluate(() => {
    (window as unknown as { __lastClickPaintMs: number }).__lastClickPaintMs = 0;
    document.addEventListener(
      "click",
      () => {
        const start = performance.now();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            (
              window as unknown as { __lastClickPaintMs: number }
            ).__lastClickPaintMs = performance.now() - start;
          });
        });
      },
      { capture: true }
    );
  });
}

async function getLastClickPaintMs(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      (window as unknown as { __lastClickPaintMs: number }).__lastClickPaintMs
  );
}

test.describe("Wizolingo Performance: Click-to-Action Latency & Web Vitals", () => {
  test("login form buttons and inline validation paint within 200ms INP threshold", async ({
    page,
  }) => {
    await page.goto("/login", { waitUntil: "load" });
    await installClickPaintProbe(page);

    // 1. Password visibility toggle latency
    const passwordInput = page.locator("#login-password");
    const toggleBtn = page.getByRole("button", { name: /show password/i });

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    const toggleLatencyMs = await getLastClickPaintMs(page);
    expect(toggleLatencyMs).toBeLessThan(MAX_CLICK_TO_PAINT_MS);

    // 2. Empty submit -> inline error feedback latency
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
    const validationLatencyMs = await getLastClickPaintMs(page);
    expect(validationLatencyMs).toBeLessThan(MAX_CLICK_TO_PAINT_MS);
  });

  test("login API response immediately triggers UI redirect without post-response stall", async ({
    page,
  }) => {
    await page.goto("/login", { waitUntil: "load" });
    await page.locator("#login-email").fill(E2E_EMAIL);
    await page.locator("#login-password").fill(E2E_PASSWORD);

    const responsePromise = page.waitForResponse(
      (res) =>
        res.url().includes("/users/login") && res.request().method() === "POST"
    );

    await page.getByRole("button", { name: /log in/i }).click();
    await responsePromise;
    const afterResponseTs = await page.evaluate(() => performance.now());

    // Branded DashboardLoader or /dashboard must appear immediately after response
    await expect(
      page.getByText("Loading your Dashboard. Please wait...")
    ).toBeVisible({ timeout: 5_000 });
    const afterFeedbackTs = await page.evaluate(() => performance.now());

    const postResponseDelayMs = afterFeedbackTs - afterResponseTs;
    expect(postResponseDelayMs).toBeLessThan(MAX_POST_RESPONSE_FEEDBACK_MS);

    await page.waitForURL(/\/dashboard/, {
      waitUntil: "commit",
      timeout: 25_000,
    });
  });

  test("store filter buttons respond within 200ms and FCP stays fast", async ({
    page,
  }) => {
    // Warm route if running against next dev, then measure warm reload FCP + click latency
    await page.goto("/shop", { waitUntil: "load" });
    await page.reload({ waitUntil: "load" });
    await installClickPaintProbe(page);

    const digitalTab = page.getByRole("button", { name: /digital downloads/i });
    if (await digitalTab.isVisible()) {
      await digitalTab.click();
      await expect(digitalTab).toHaveClass(/bg-\[#D70E1D\]/);
      const filterLatencyMs = await getLastClickPaintMs(page);
      expect(filterLatencyMs).toBeLessThan(MAX_CLICK_TO_PAINT_MS);
    }

    const fcpMs = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType("paint");
      const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");
      return fcp ? fcp.startTime : 0;
    });

    expect(fcpMs).toBeLessThan(5000);
  });
});
