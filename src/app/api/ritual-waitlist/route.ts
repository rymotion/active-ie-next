import { NextRequest, NextResponse } from 'next/server';

// Ritual waitlist endpoint — stub. Persist entries to your store of choice
// (Sheets sync, DB, or a form service). Fields: name, email, phone, zip,
// interest, budget, heard, at.
export async function POST(req: NextRequest) {
  const entry = await req.json();
  if (!entry?.email || !/^\S+@\S+\.\S+$/.test(entry.email) || !/^\d{5}$/.test(entry.zip || '')) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  console.log('[ritual-waitlist]', entry); // TODO: persist
  return NextResponse.json({ ok: true });
}
