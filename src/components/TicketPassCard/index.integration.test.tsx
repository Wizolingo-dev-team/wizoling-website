import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TicketPassCard from "./index";
import type { TicketOrder } from "@src/types/eventManagement";

const mockToPng = vi.fn(async () => "data:image/png;base64,MOCKPNG");
const mockToJpeg = vi.fn(async () => "data:image/jpeg;base64,MOCKJPG");

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn(async () => "data:image/png;base64,MOCKQR"),
  },
}));

vi.mock("html-to-image", () => ({
  toPng: () => mockToPng(),
  toJpeg: () => mockToJpeg(),
}));

vi.mock("@src/hooks/useToast", () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }),
}));

const sampleTicket: TicketOrder = {
  _id: "tkt_1",
  event: {
    _id: "evt_1",
    title: "WIZ OFUASIA LIVE IN BERLIN",
    slug: "wiz-ofuasia-live-in-berlin",
    venue: "002 Arena",
    location: "Berlin, Germany",
    startDate: "2026-11-20T20:00:00.000Z",
    dateLabel: "Nov 20, 2026",
    time: "8:00 PM",
    flyerUrl: "/images/gallery/wizolingo1.jpg",
  },
  user: "usr_1",
  attendeeName: "Daniel Effiong",
  email: "it.dannybizman@gmail.com",
  phone: "",
  paypalOrderId: "",
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
  updatedAt: "2026-11-18T00:00:00.000Z",
};

describe("TicketPassCard integration", () => {
  it("renders branded ticket pass with preserved ticketCode, QR code, and PNG/JPG download triggers", async () => {
    const user = userEvent.setup();
    render(<TicketPassCard ticket={sampleTicket} />);

    expect(screen.getByText("WIZ OFUASIA LIVE IN BERLIN")).toBeVisible();
    expect(screen.getByText("WIZ-TKT-038D4A80")).toBeVisible();
    expect(screen.getByText("CONFIRMED")).toBeVisible();
    expect(
      await screen.findByAltText("Scan QR code to verify WIZ-TKT-038D4A80")
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: /download png/i }));
    await waitFor(() => expect(mockToPng).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("button", { name: /download jpg/i }));
    await waitFor(() => expect(mockToJpeg).toHaveBeenCalledTimes(1));
  });
});
