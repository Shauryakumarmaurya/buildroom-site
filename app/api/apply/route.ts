import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ApplyPayload = {
  track?: string;
  name?: string;
  email?: string;
  linkedin?: string;
  college?: string;
  pitch?: string;
  data?: Record<string, unknown>;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: ApplyPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request body." }, { status: 400 });
  }

  const track = (body.track ?? "").trim();
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const linkedin = (body.linkedin ?? "").trim();
  const college = (body.college ?? "").trim();
  const pitch = (body.pitch ?? "").trim();
  const data = body.data && typeof body.data === "object" ? body.data : {};

  if (track !== "founder" && track !== "builder") {
    return NextResponse.json(
      { error: "please choose how you'd like to apply." },
      { status: 400 }
    );
  }
  if (!name || !email || !college || !pitch) {
    return NextResponse.json(
      { error: "please fill in all required fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "please enter a valid email." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("Supabase env vars are not set");
    return NextResponse.json(
      { error: "the form isn't configured yet. please try again later." },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("applications").insert({
    name,
    college,
    email,
    pitch,
    role: track === "founder" ? "founder — building a startup" : "builder — joining a startup",
    track,
    linkedin,
    data: { ...data, linkedin },
  });

  if (error) {
    console.error("Supabase insert failed:", error.message);
    return NextResponse.json(
      { error: "couldn't save your application. please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
