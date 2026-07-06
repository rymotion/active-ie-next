import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type IgPost = {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  /** Always an image URL (video posts use their thumbnail). */
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

export type InstagramResult =
  | { posts: IgPost[]; error?: undefined }
  | { posts?: undefined; error: string };

type IgApiMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

/**
 * The live token lives in Supabase (kept fresh by the weekly refresh cron);
 * the IG_ACCESS_TOKEN env var is only the bootstrap/fallback seed.
 */
export async function getInstagramToken(): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data } = await supabase
      .from("ig_tokens")
      .select("token")
      .eq("id", 1)
      .maybeSingle();
    if (data?.token) return data.token;
  }
  return process.env.IG_ACCESS_TOKEN || null;
}

/**
 * Latest @actv_ie posts via the Instagram Graph API, cached for an hour.
 * Never throws — pages render a branded fallback on any error.
 */
export async function getInstagramMedia(limit = 12): Promise<InstagramResult> {
  const token = await getInstagramToken();
  if (!token) return { error: "not-configured" };

  try {
    const url =
      "https://graph.instagram.com/me/media" +
      `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp` +
      `&limit=${limit}&access_token=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      next: { revalidate: 3600, tags: ["instagram"] },
    });
    if (!response.ok) return { error: `http-${response.status}` };

    const json = (await response.json()) as { data?: IgApiMedia[] };
    const posts: IgPost[] = [];
    for (const media of json.data ?? []) {
      const imageUrl =
        media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
      if (!imageUrl) continue;
      posts.push({
        id: media.id,
        caption: media.caption,
        mediaType: media.media_type as IgPost["mediaType"],
        imageUrl,
        permalink: media.permalink,
        timestamp: media.timestamp,
      });
    }

    return { posts };
  } catch {
    return { error: "fetch-failed" };
  }
}
