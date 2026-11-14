// @vitest-environment node
import { describe, expect, it } from "vitest";
import { cn } from "@repo/ui/lib/utils";

describe("cn", () => {
  it("combines conditional inputs while letting later utilities win", () => {
    expect(
      cn(
        "px-4 text-sm",
        ["font-medium"],
        { hidden: false, block: true },
        "px-8",
      ),
    ).toBe("text-sm font-medium block px-8");
  });

  it("keeps responsive and interaction variants independent", () => {
    expect(cn("px-4 hover:px-2 md:px-6", "px-8 hover:px-3")).toBe(
      "md:px-6 px-8 hover:px-3",
    );
  });
});
