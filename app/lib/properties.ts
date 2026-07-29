import { supabase } from "./supabase";

export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading properties:", error);
    return [];
  }

  return data ?? [];
}