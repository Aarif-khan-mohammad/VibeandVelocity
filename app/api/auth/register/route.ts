import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, age, gender } = await req.json();

    if (!name || !password || (!email && !phone)) {
      return NextResponse.json({ error: "Name, password and email or phone are required." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, phone, password, age, gender)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, age, gender, role`,
      [name, email || null, phone || null, hashed, age || null, gender || null]
    );

    return NextResponse.json({ user: rows[0] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    if (msg.includes("unique")) return NextResponse.json({ error: "Email or phone already registered." }, { status: 409 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
