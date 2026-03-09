import { describe, it, expect } from "vitest";

import { getPrevWeekStart } from "@/date";

describe("getPrevWeekStart", () => {
  it("should get previous monday when the input is a monday", () => {
    const monday = new Date(2026, 5, 15); // Monday, June 15, 2026
    const expectedMonday = new Date(2026, 5, 8); // Monday, June 8, 2026
    const result = getPrevWeekStart(monday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should get the monday of the previous week when the input is not a monday", () => {
    const wednesday = new Date(2026, 5, 17); // Wednesday, June 17, 2026
    const expectedMonday = new Date(2026, 5, 8); // Monday, June 8, 2026
    const result = getPrevWeekStart(wednesday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });
});