import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/clicks?name=...
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ count: 0 });

  const { data } = await supabase
    .from("clicks")
    .select("count")
    .eq("product_name", name)
    .single();

  return NextResponse.json({ count: data?.count ?? 0 });
}

// POST /api/clicks  body: { name }
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const { data: existing } = await supabase
    .from("clicks")
    .select("count")
    .eq("product_name", name)
    .single();

  const newCount = (existing?.count ?? 0) + 1;

  await supabase
    .from("clicks")
    .upsert({ product_name: name, count: newCount }, { onConflict: "product_name" });

  return NextResponse.json({ count: newCount });
}
