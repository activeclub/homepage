import { token } from "./env";

const BASE_URL = "https://discord.com/api/v10";

const CHANNEL_ID = "767264683849547796";

async function sendMessage(channelId: string, content: string) {
  const ret = await fetch(`${BASE_URL}/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await ret.json();
  return data;
}

export { sendMessage, CHANNEL_ID };
