import { describe, expect, it } from "vitest";
import { calculateTotal } from "@repo/shared/lib/calculate-total";

describe("calculateTotal", () => {
  it("calculates price including tax", () => {
    expect(calculateTotal(100, 0.08)).toBe(108);
  });

  it("rounds to two decimal places", () => {
    expect(calculateTotal(19.99, 0.075)).toBe(21.49);
  });

  it("preserves the price when tax is zero", () => {
    expect(calculateTotal(19.99, 0)).toBe(19.99);
  });
});
