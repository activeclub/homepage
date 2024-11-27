import { expect, test } from "vitest";
import { formatDate } from "./utils";

test("Test formatDate", () => {
  expect(formatDate("2024-01-31")).toBe("January 31, 2024");
});
