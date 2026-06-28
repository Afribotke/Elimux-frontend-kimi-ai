import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { query, filters } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    let institutionQuery = supabase.from("institutions").select("*").ilike("name", `%${query}%`).limit(10);
    if (filters?.country) institutionQuery = institutionQuery.eq("country", filters.country);
    if (filters?.type) institutionQuery = institutionQuery.eq("type", filters.type);

    const { data: institutions, error: instError } = await institutionQuery;
    if (instError) return NextResponse.json({ error: instError.message }, { status: 500 });

    let programQuery = supabase.from("programs").select("*, institutions(name, country)").ilike("name", `%${query}%`).limit(10);
    if (filters?.degree_type) programQuery = programQuery.eq("degree_type", filters.degree_type);

    const { data: programs, error: progError } = await programQuery;
    if (progError) return NextResponse.json({ error: progError.message }, { status: 500 });

    return NextResponse.json({
      success: true,
      query,
      institutions: institutions || [],
      programs: programs || [],
      total: (institutions?.length || 0) + (programs?.length || 0),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
