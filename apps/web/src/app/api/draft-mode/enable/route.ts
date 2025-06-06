import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { client } from "@/lib/sanity/client";
import { token } from "@/lib/sanity/env";

const clientWithToken = client.withConfig({ token });

export async function GET(request: NextRequest) {
  if (!token) {
    return new Response("Missing environment variable SANITY_API_READ_TOKEN", {
      status: 500,
    });
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
