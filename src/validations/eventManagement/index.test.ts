import { describe, expect, it } from "vitest";
import { purchaseTicketSchema } from "./index";

describe("eventManagement validation schemas", () => {
  it("requires at least one ticket and valid attendee info", async () => {
    await expect(
      purchaseTicketSchema.validate({
        eventId: "evt_1",
        tickets: [],
        attendeeName: "Daniel",
        email: "fan@wizofuasia.com",
      })
    ).rejects.toThrow();

    const valid = await purchaseTicketSchema.validate({
      eventId: "evt_1",
      tickets: [{ tierId: "tier_1", quantity: 2 }],
      attendeeName: "Daniel Effiong",
      email: "fan@wizofuasia.com",
      phone: "+1 555 123 4567",
    });
    expect(valid.tickets).toHaveLength(1);
  });
});

