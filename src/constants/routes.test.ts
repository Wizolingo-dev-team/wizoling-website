import { describe, expect, it } from "vitest";
import {
  ROUTES,
  isGatedDashboardRoute,
  isStandaloneShellRoute,
} from "./routes";

describe("routes helpers", () => {
  it("identifies all gated dashboard routes", () => {
    expect(isGatedDashboardRoute(ROUTES.DASHBOARD)).toBe(true);
    expect(isGatedDashboardRoute(ROUTES.ORDERS)).toBe(true);
    expect(isGatedDashboardRoute(ROUTES.DEALS)).toBe(true);
    expect(isGatedDashboardRoute(ROUTES.WISHLIST)).toBe(true);
    expect(isGatedDashboardRoute(ROUTES.SETTINGS)).toBe(true);
    expect(isGatedDashboardRoute("/dashboard/overview")).toBe(true);
    expect(isGatedDashboardRoute(ROUTES.SHOP)).toBe(false);
    expect(isGatedDashboardRoute(ROUTES.LOGIN)).toBe(false);
  });

  it("identifies standalone shell routes including ticket verification", () => {
    expect(isStandaloneShellRoute(ROUTES.DASHBOARD)).toBe(true);
    expect(isStandaloneShellRoute("/tickets/verify/WIZ-TKT-038D4A80")).toBe(
      true
    );
    expect(isStandaloneShellRoute("/events")).toBe(false);
    expect(isStandaloneShellRoute("/")).toBe(false);
  });
});

