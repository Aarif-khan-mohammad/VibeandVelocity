import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/phone and password are required." }, { status: 400 });
    }

    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = $1 OR phone = $1`,
      [identifier]
    );

    if (!rows[0]) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return NextResponse.json({ error: "Invalid password." }, { status: 401 });

    const { password: _pwd, ...user } = rows[0];
    return NextResponse.json({ user });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
