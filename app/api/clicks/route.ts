import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ count: 0 });

  const { rows } = await pool.query(
    "SELECT count FROM clicks WHERE product_name = $1",
    [name]
  );
  return NextResponse.json({ count: rows[0]?.count ?? 0 });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  await pool.query(
    `INSERT INTO clicks (product_name, count) VALUES ($1, 1)
     ON CONFLICT (product_name) DO UPDATE SET count = clicks.count + 1`,
    [name]
  );

  const { rows } = await pool.query(
    "SELECT count FROM clicks WHERE product_name = $1",
    [name]
  );
  return NextResponse.json({ count: rows[0]?.count ?? 1 });
}
