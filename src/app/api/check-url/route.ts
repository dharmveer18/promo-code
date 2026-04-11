import { type NextRequest, NextResponse } from "next/server";

import { checkUrl } from "~/utils/check-url";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  const result = await checkUrl(raw);
  return NextResponse.json(result);
}
