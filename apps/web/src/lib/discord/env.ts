import { assertValue } from "../utils";

export const token = assertValue(
  process.env.DISCORD_TOKEN,
  "Missing environment variable: DISCORD_TOKEN"
);
