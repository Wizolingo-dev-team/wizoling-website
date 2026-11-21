import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import WidgetInfoPopover from "./index";

describe("WidgetInfoPopover integration", () => {
  it("opens summary popover when info icon button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <WidgetInfoPopover
        title="Total Orders"
        summary="Tracks your cumulative Wiz Ofuasia Store purchases."
      />
    );

    const infoBtn = screen.getByRole("button", { name: /about total orders/i });
    expect(infoBtn).toBeVisible();

    await user.click(infoBtn);

    expect(await screen.findByText("Metric Summary")).toBeVisible();
    expect(
      await screen.findByText(
        "Tracks your cumulative Wiz Ofuasia Store purchases."
      )
    ).toBeVisible();
  });
});

