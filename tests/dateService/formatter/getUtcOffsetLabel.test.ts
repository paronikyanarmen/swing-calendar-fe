import { describe, it, expect, vi } from "vitest";
import dayjs from "dayjs";

import { getUtcOffsetLabel } from "@/dateService/formatter";

describe("getUtcOffsetLabel", () => {
  const date = new Date();

  function mockUtcOffset(offset: number) {
    vi.spyOn(dayjs.prototype, "utcOffset").mockReturnValue(offset as never);
  }

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return UTC+00 when offset is 0", () => {
    mockUtcOffset(0);
    expect(getUtcOffsetLabel(date)).toBe("UTC+00");
  });

  it("should return UTC-05 when offset is -300", () => {
    mockUtcOffset(-300);
    expect(getUtcOffsetLabel(date)).toBe("UTC-05");
  });

  it("should return UTC-05:30 when offset is -330", () => {
    mockUtcOffset(-330);
    expect(getUtcOffsetLabel(date)).toBe("UTC-05:30");
  });

  it("should return UTC-11 when offset is -660", () => {
    mockUtcOffset(-660);
    expect(getUtcOffsetLabel(date)).toBe("UTC-11");
  });

  it("should return UTC+05 when offset is 300", () => {
    mockUtcOffset(300);
    expect(getUtcOffsetLabel(date)).toBe("UTC+05");
  });

  it("should return UTC+05:30 when offset is 330", () => {
    mockUtcOffset(330);
    expect(getUtcOffsetLabel(date)).toBe("UTC+05:30");
  });

  it("should return UTC+11 when offset is 660", () => {
    mockUtcOffset(660);
    expect(getUtcOffsetLabel(date)).toBe("UTC+11");
  });
});