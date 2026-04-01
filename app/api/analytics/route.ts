import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Top 10 products by clicks
    const { rows: topProducts } = await pool.query(
      `SELECT product_name, count FROM clicks ORDER BY count DESC LIMIT 10`
    );

    // Monthly clicks — only months that have actual clicks
    const { rows: monthly } = await pool.query(
      `SELECT TO_CHAR(DATE_TRUNC('month', clicked_at), 'Mon YYYY') AS month,
              SUM(count)::int AS total
       FROM clicks
       WHERE clicked_at IS NOT NULL
       GROUP BY DATE_TRUNC('month', clicked_at)
       HAVING SUM(count) > 0
       ORDER BY DATE_TRUNC('month', clicked_at) ASC`
    );

    // Daily clicks — last 30 days, only days with clicks
    const { rows: daily } = await pool.query(
      `SELECT TO_CHAR(clicked_at, 'DD Mon') AS day,
              SUM(count)::int AS total
       FROM clicks
       WHERE clicked_at >= CURRENT_DATE - INTERVAL '30 days'
         AND clicked_at IS NOT NULL
       GROUP BY clicked_at
       HAVING SUM(count) > 0
       ORDER BY clicked_at ASC`
    );

    return NextResponse.json({ topProducts, monthly, daily });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
