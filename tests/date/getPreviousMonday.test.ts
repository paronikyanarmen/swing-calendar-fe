import { describe, it, expect } from "vitest";

import { getPreviousMonday } from "@/date";

describe("getPreviousMonday", () => {
  it("should return the same date when input is a monday", () => {
    const monday = new Date(2026, 2, 2); // Monday, March 2, 2026
    const result = getPreviousMonday(monday);
    expect(result.toDateString()).toBe(monday.toDateString());
  });

  it("should return the monday of the same week when input is tuesday", () => {
    const tuesday = new Date(2026, 2, 3);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(tuesday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should return the monday of the same week when input is wednesday", () => {
    const wednesday = new Date(2026, 2, 4);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(wednesday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should return the monday of the same week when input is thursday", () => {
    const thursday = new Date(2026, 2, 5);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(thursday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should return the monday of the same week when input is friday", () => {
    const friday = new Date(2026, 2, 6);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(friday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should return the monday of the same week when input is saturday", () => {
    const saturday = new Date(2026, 2, 7);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(saturday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });

  it("should return the monday of the same week when input is sunday", () => {
    const sunday = new Date(2026, 2, 8);
    const expectedMonday = new Date(2026, 2, 2);
    const result = getPreviousMonday(sunday);
    expect(result.toDateString()).toBe(expectedMonday.toDateString());
  });
});