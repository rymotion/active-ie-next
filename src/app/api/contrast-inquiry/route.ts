import { NextResponse } from "next/server";

/**
 * Contrast therapy inquiry endpoint.
 *
 * Accepts a JSON POST from the /contrast-therapy inquiry form, validates it,
 * and forwards it to the Zapier webhook configured via the server-only
 * ZAPIER_CONTRAST_INQUIRY_WEBHOOK_URL environment variable. The webhook URL
 * and submitted field values are never logged or echoed back to the client.
 */

// Maximum accepted request body size, in bytes.
const MAX_BODY_BYTES = 10240;

// Per-field maximum lengths, in characters.
const FIELD_MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 254,
  phone: 30,
  eventDate: 40,
  eventLocation: 120,
  message: 2000,
};

const REQUIRED_FIELDS = ["name", "email", "message"];
const OPTIONAL_FIELDS = ["phone", "eventDate", "eventLocation"];

const PACKAGE_INTEREST_VALUES = ["single", "party", "custom_large", "not_sure"];

// Hidden form field used as a bot trap; humans never fill it.
const HONEYPOT_FIELD = "website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function invalidRequest(status: number = 400) {
  // Generic message on purpose: never echo user input back.
  return NextResponse.json(
    { ok: false, error: "Invalid request." },
    { status }
  );
}

function upstreamFailure() {
  return NextResponse.json(
    { ok: false, error: "Unable to send your inquiry right now." },
    { status: 502 }
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return invalidRequest();
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return invalidRequest();
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Request body too large." },
      { status: 413 }
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return invalidRequest();
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return invalidRequest();
  }

  const body = parsed as Record<string, unknown>;

  // Honeypot filled: respond exactly like a success so bots learn nothing,
  // but do not forward anything to the webhook and do not log the value.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fields: Record<string, string> = {};
  for (const key of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
    const value = body[key];
    if (value === undefined || value === null) {
      fields[key] = "";
      continue;
    }
    if (typeof value !== "string") {
      return invalidRequest();
    }
    fields[key] = value.trim();
  }

  for (const key of REQUIRED_FIELDS) {
    if (fields[key] === "") {
      return invalidRequest();
    }
  }

  for (const [key, maxLength] of Object.entries(FIELD_MAX_LENGTHS)) {
    if (fields[key].length > maxLength) {
      return invalidRequest();
    }
  }

  if (!EMAIL_PATTERN.test(fields.email)) {
    return invalidRequest();
  }

  const packageInterest = body.packageInterest;
  if (
    typeof packageInterest !== "string" ||
    !PACKAGE_INTEREST_VALUES.includes(packageInterest)
  ) {
    return invalidRequest();
  }

  const webhookUrl = process.env.ZAPIER_CONTRAST_INQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error(
      "contrast-inquiry: ZAPIER_CONTRAST_INQUIRY_WEBHOOK_URL is not configured."
    );
    return NextResponse.json(
      { ok: false, error: "This service is temporarily unavailable." },
      { status: 503 }
    );
  }

  const payload = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    eventDate: fields.eventDate,
    eventLocation: fields.eventLocation,
    packageInterest,
    message: fields.message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      console.error(
        `contrast-inquiry: webhook responded with status ${webhookResponse.status}.`
      );
      return upstreamFailure();
    }
  } catch {
    console.error("contrast-inquiry: failed to reach the inquiry webhook.");
    return upstreamFailure();
  }

  return NextResponse.json({ ok: true });
}
