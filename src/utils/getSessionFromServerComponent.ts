import { createSupabaseClient } from "@/utils/createSupabaseClient";
import { cookies } from "next/headers";

export default async function getSessionFromServerComponent() {
    const supabase = createSupabaseClient(cookies());
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    return data.session;
}
