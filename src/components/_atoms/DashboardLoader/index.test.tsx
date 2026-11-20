import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardLoader from "./index";

describe("DashboardLoader", () => {
  it("renders branded loading message and status role", () => {
    render(<DashboardLoader />);
    const status = screen.getByRole("status");
    expect(status).toBeVisible();
    expect(
      screen.getByText("Loading your Dashboard. Please wait...")
    ).toBeVisible();
    expect(screen.getByText("Wiz Ofuasia (Wiz Boyy)")).toBeVisible();
  });
});

