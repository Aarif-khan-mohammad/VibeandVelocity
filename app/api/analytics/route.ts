import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const sb = getSupabase();

    // Top 10 products by total clicks
    const { data: allClicks } = await sb.from("clicks").select("product_name, count");
    const rows = allClicks as { product_name: string; count: number }[] ?? [];

    const totals: Record<string, number> = {};
    rows.forEach((r) => { totals[r.product_name] = (totals[r.product_name] ?? 0) + r.count; });
    const topProducts = Object.entries(totals)
      .map(([product_name, count]) => ({ product_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Monthly clicks — only months with data
    const monthMap: Record<string, number> = {};
    const dailyMap: Record<string, number> = {};

    const { data: clicksWithDate } = await sb.from("clicks").select("product_name, count, clicked_at");
    const dated = clicksWithDate as { product_name: string; count: number; clicked_at: string }[] ?? [];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    dated.forEach((r) => {
      if (!r.clicked_at) return;
      const d = new Date(r.clicked_at);

      // Monthly
      const monthKey = d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
      monthMap[monthKey] = (monthMap[monthKey] ?? 0) + r.count;

      // Daily (last 30 days)
      if (d >= thirtyDaysAgo) {
        const dayKey = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
        dailyMap[dayKey] = (dailyMap[dayKey] ?? 0) + r.count;
      }
    });

    const monthly = Object.entries(monthMap)
      .map(([month, total]) => ({ month, total }));

    const daily = Object.entries(dailyMap)
      .map(([day, total]) => ({ day, total }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

    return NextResponse.json({ topProducts, monthly, daily });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
