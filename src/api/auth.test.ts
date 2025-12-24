import { describe, expect, test } from "vitest";
import { getAPIKey } from "./auth.js"

describe("getAPIKey()", () => {
  test("Should return API Key if correct Header", () => {
    const headerGood = {
      authorization: "ApiKey ac89b7667acb896879",
      origin: "0.0.0.0",
    };
    expect(getAPIKey(headerGood)).toBe("ac89b7667acb896879");
  });

  test("Should return null if no Authorization header", () => {
    const headerNoAuth = {
      origin: "0.0.0.0",
    };
    expect(getAPIKey(headerNoAuth)).toBeNull();
  });

  test("Should return null if Authorization header is malformed", () => {
    const headerBadAuth = {
      authorization: "authorized",
      origin: "0.0.0.0",
    };
    expect(getAPIKey(headerBadAuth)).toBeNull();
  });

  test("Should return null if Authorization header doesn't contain correct key", () => {
    const headerWrongAuth = {
      authorization: "Cookie ac89b7667acb896879",
      origin: "0.0.0.0",
    };
    expect(getAPIKey(headerWrongAuth)).toBeNull();
  });
});