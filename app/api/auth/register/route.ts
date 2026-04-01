import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, age, gender } = await req.json();

    if (!name || !password || (!email && !phone)) {
      return NextResponse.json({ error: "Name, password and email or phone are required." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await getSupabase()
      .from("users")
      .insert({ name, email: email || null, phone: phone || null, password: hashed, age: age || null, gender: gender || null })
      .select("id, name, email, phone, age, gender, role")
      .single();

    if (error) {
      if (error.message.includes("unique") || error.code === "23505")
        return NextResponse.json({ error: "Email or phone already registered." }, { status: 409 });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user: data });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
