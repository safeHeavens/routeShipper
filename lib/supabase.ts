import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // This will help us catch if the .env.local is in the wrong place
    console.error("Supabase variables missing. Check your .env.local placement.");
}

export const supabase = createClient(
    supabaseUrl || "",
    supabaseAnonKey || ""
);