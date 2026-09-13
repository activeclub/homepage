import { strictEqual } from "node:assert";
import { test } from "node:test";
import { formatDate } from "./utils.ts";

test("Test formatDate", () => {
  strictEqual(formatDate("2024-01-31"), "January 31, 2024");
});
