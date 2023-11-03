import { createBrowserClient } from "@supabase/ssr";

export default function createSupabaseBrowserClient() {
    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    return supabase;
}
