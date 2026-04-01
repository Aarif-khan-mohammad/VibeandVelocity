import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await getSupabase().from("clicks").select("product_name, count");
  return NextResponse.json(data ?? []);
}
