import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TicketVerifyContent from "./TicketVerifyContent";

vi.mock("@src/hooks/eventManagement", () => ({
  useVerifyTicket: () => ({
    isLoading: false,
    isError: false,
    data: {
      _id: "tkt_1",
      event: {
        _id: "evt_1",
        title: "WIZ OFUASIA LIVE IN BERLIN",
        venue: "002",
        location: "Germany",
        dateLabel: "Nov 20, 2026",
      },
      attendeeName: "Daniel Effiong",
      tickets: [
        {
          tierId: "tier_1",
          tierName: "General Admission",
          unitPrice: 45,
          quantity: 2,
          subtotal: 90,
        },
      ],
      totalAmount: 90,
      currency: "USD",
      ticketCode: "WIZ-TKT-038D4A80",
      paymentMethod: "paypal",
      paymentStatus: "completed",
      status: "Confirmed",
      createdAt: "2026-11-18T00:00:00.000Z",
    },
  }),
}));

describe("TicketVerifyContent integration", () => {
  it("renders Confirmed status, ticketCode, and Go back to your dashboard link", () => {
    render(<TicketVerifyContent code="WIZ-TKT-038D4A80" />);

    expect(screen.getByText("CONFIRMED")).toBeVisible();
    expect(screen.getByText("WIZ-TKT-038D4A80")).toBeVisible();
    expect(screen.getByText("WIZ OFUASIA LIVE IN BERLIN")).toBeVisible();

    const dashboardLink = screen.getByRole("link", {
      name: /go back to your dashboard/i,
    });
    expect(dashboardLink).toBeVisible();
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });
});

