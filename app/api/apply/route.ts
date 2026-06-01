import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ApplyPayload = {
  name?: string;
  collegeYear?: string;
  email?: string;
  role?: string;
  building?: string;
  unfairAdvantage?: string;
  links?: string;
  hardestThing?: string;
  commitment?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const roleLabel = (role: string) => {
  if (role === "joining") return "open to joining a team";
  if (role === "either") return "open to either";
  return "looking for a co-founder";
};

export async function POST(request: Request) {
  let body: ApplyPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const collegeYear = (body.collegeYear ?? "").trim();
  const email = (body.email ?? "").trim();
  const role = (body.role ?? "").trim();
  const building = (body.building ?? "").trim();
  const unfairAdvantage = (body.unfairAdvantage ?? "").trim();
  const links = (body.links ?? "").trim();
  const hardestThing = (body.hardestThing ?? "").trim();
  const commitment = (body.commitment ?? "").trim();

  if (
    !name ||
    !collegeYear ||
    !email ||
    !building ||
    !unfairAdvantage ||
    !hardestThing ||
    !commitment
  ) {
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
    college: collegeYear,
    email,
    role: roleLabel(role),
    pitch: building,
    unfair_advantage: unfairAdvantage,
    hardest_thing: hardestThing,
    commitment,
    links: links || null,
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
