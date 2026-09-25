import { describe, expect, it } from "vitest";
import { createOtpCode, hashOtpCode, normalizeIranMobile, verifyOtpCode } from "./auth";

describe("auth OTP helpers", () => {
  it("normalizes Iranian mobile numbers", () => {
    expect(normalizeIranMobile("+989121234567")).toBe("09121234567");
    expect(normalizeIranMobile("9121234567")).toBe("09121234567");
  });

  it("creates and verifies hashed OTP codes", () => {
    const code = createOtpCode();
    const hash = hashOtpCode("09121234567", code);

    expect(code).toMatch(/^\d{6}$/);
    expect(verifyOtpCode("+989121234567", code, hash)).toBe(true);
    expect(verifyOtpCode("+989121234567", "000000", hash)).toBe(false);
  });
});
