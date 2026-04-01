import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ count: 0 });

  const { data } = await getSupabase()
    .from("clicks")
    .select("count")
    .eq("product_name", name)
    .single();

  return NextResponse.json({ count: (data as { count: number } | null)?.count ?? 0 });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const sb = getSupabase();

  const { data: existing } = await sb
    .from("clicks")
    .select("count, id")
    .eq("product_name", name)
    .eq("clicked_at", new Date().toISOString().split("T")[0])
    .single();

  const row = existing as { count: number; id: number } | null;

  if (row) {
    await sb.from("clicks").update({ count: row.count + 1 }).eq("id", row.id);
  } else {
    await sb.from("clicks").insert({ product_name: name, count: 1, clicked_at: new Date().toISOString().split("T")[0] });
  }

  const { data: total } = await sb.from("clicks").select("count").eq("product_name", name);
  const sum = (total as { count: number }[] | null)?.reduce((a, b) => a + b.count, 0) ?? 1;

  return NextResponse.json({ count: sum });
}
