import { describe, expect, it } from "vitest";
import { createOrderSchema } from "./index";

describe("orderManagement validation schemas", () => {
  it("allows digital-only order without shipping address", async () => {
    const valid = await createOrderSchema.validate({
      products: [{ _id: "prod_1", quantity: 1 }],
      includesMerch: false,
      paymentMethod: "manual",
      email: "fan@wizofuasia.com",
    });
    expect(valid.email).toBe("fan@wizofuasia.com");
  });

  it("requires shipping fields when includesMerch is true", async () => {
    await expect(
      createOrderSchema.validate({
        products: [{ _id: "prod_2", quantity: 1 }],
        includesMerch: true,
        paymentMethod: "manual",
        email: "fan@wizofuasia.com",
      })
    ).rejects.toThrow();
  });
});

