import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ count: 0 });

  const { data } = await getSupabase()
    .from("clicks")
    .select("count")
    .eq("product_name", name)
    .single() as { data: { count: number } | null };

  return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const { data: existing } = await getSupabase()
    .from("clicks")
    .select("count")
    .eq("product_name", name)
    .single() as { data: { count: number } | null };

  const newCount = (existing?.count ?? 0) + 1;

  await getSupabase()
    .from("clicks")
    .upsert({ product_name: name, count: newCount }, { onConflict: "product_name" });

  return NextResponse.json({ count: newCount });
}
