import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/phone and password are required." }, { status: 400 });
    }

    const { data } = await getSupabase()
      .from("users")
      .select("*")
      .or(`email.eq.${identifier},phone.eq.${identifier}`)
      .single();

    if (!data) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const valid = await bcrypt.compare(password, data.password);
    if (!valid) return NextResponse.json({ error: "Invalid password." }, { status: 401 });

    const { password: _pwd, ...user } = data;
    return NextResponse.json({ user });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
