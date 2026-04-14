import { describe, it, expect } from "vitest";

import { getWeekDays } from "@/dateService/collectionGenerator";

describe("getWeekDays", () => {
  it("should return 7 days starting from the given Monday", () => {
    const monday = new Date(2026, 2, 2); // Monday, March 2, 2026
    const days = getWeekDays(monday);

    expect(days).toHaveLength(7);
    expect(days[0].toDateString()).toBe("Mon Mar 02 2026");
    expect(days[6].toDateString()).toBe("Sun Mar 08 2026");
  });

  it("should return consecutive days", () => {
    const monday = new Date(2026, 2, 9);
    const days = getWeekDays(monday);

    for (let i = 1; i < days.length; i++) {
      const diff = days[i].getDate() - days[i - 1].getDate();
      expect(diff).toBe(1);
    }
  });

  it("should handle month boundaries", () => {
    const monday = new Date(2026, 1, 23); // Monday, Feb 23, 2026
    const days = getWeekDays(monday);

    expect(days[0].toDateString()).toBe("Mon Feb 23 2026");
    expect(days[6].toDateString()).toBe("Sun Mar 01 2026");
  });
});