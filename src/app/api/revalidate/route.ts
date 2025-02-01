// import { revalidate } from "../lib/shopify";
import { revalidate } from "../../../../lib/shopify";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
