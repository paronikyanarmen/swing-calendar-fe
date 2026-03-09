import { describe, it, expect } from "vitest";

import { getWeekNumber } from "@/date";

describe("getWeekNumber", () => {
  it("should return correct week number when week is in the middle of the year", () => {
    const date = new Date(2026, 5, 15); // Monday, June 15, 2026
    expect(getWeekNumber(date)).toBe(25);
  });

  it("should return 1 when the date is in the first week of the year", () => {
    const date = new Date(2026, 0, 1); // Thursday, January 1, 2026
    expect(getWeekNumber(date)).toBe(1);
  });

  it("should return 52 when the date is in the last week of the year", () => {
    const date = new Date(2026, 11, 25); // Friday, December 25, 2026
    expect(getWeekNumber(date)).toBe(52);
  });
});
