import { describe, it, expect } from "vitest";

import { getNextWeekStart } from "@/dateService/math";

describe("getNextWeekStart", () => {
  it("should get next monday when the input is a monday", () => {
    const monday = new Date(2026, 5, 15); // Monday, June 15, 2026
    const expectedMonday = new Date(2026, 5, 22); // Monday, June 22, 2026
    const result = getNextWeekStart(monday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should get the monday of the next week when the input is not a monday", () => {
    const wednesday = new Date(2026, 5, 17); // Wednesday, June 17, 2026
    const expectedMonday = new Date(2026, 5, 22); // Monday, June 22, 2026
    const result = getNextWeekStart(wednesday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });
});