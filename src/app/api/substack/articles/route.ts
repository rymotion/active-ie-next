import { NextResponse } from "next/server";
import { SubstackResponse } from "@/types/substack";

export async function fetchArticles() {
  try {
    // Get the Substack API key from environment variables

    // Create a response with CORS headers
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${process.env.SUBSTACK_API_KEY}`);
    // Make the request with proper headers
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Factiveie.substack.com%2Ffeed`
    );

    if (!response.ok) {
      if (response.bytes.length == 0) {
        return NextResponse.json({});
      } else {
        throw new Error(`Substack API error: ${response.status}`);
      }
    }
    console.log(await response.json());
    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error fetching Substack articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
