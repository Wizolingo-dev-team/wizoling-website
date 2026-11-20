import { describe, expect, it } from "vitest";
import { getTicketStatusConfig } from "./ticketStatus";

describe("getTicketStatusConfig", () => {
  it("returns green check config for Confirmed", () => {
    const config = getTicketStatusConfig("Confirmed");
    expect(config.label).toBe("CONFIRMED");
    expect(config.bgClass).toBe("bg-emerald-600");
    expect(config.iconName).toBe("check");
  });

  it("returns blue checked-in config for Checked In", () => {
    const config = getTicketStatusConfig("Checked In");
    expect(config.label).toBe("CHECKED IN");
    expect(config.bgClass).toBe("bg-blue-600");
    expect(config.iconName).toBe("checked-in");
  });

  it("returns red cancelled config for Cancelled", () => {
    const config = getTicketStatusConfig("Cancelled");
    expect(config.label).toBe("CANCELLED");
    expect(config.bgClass).toBe("bg-[#D70E1D]");
    expect(config.iconName).toBe("cancelled");
  });

  it("returns amber processing config for Processing", () => {
    const config = getTicketStatusConfig("Processing");
    expect(config.label).toBe("PROCESSING");
    expect(config.bgClass).toBe("bg-amber-500");
    expect(config.iconName).toBe("processing");
  });
});

