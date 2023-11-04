import createSupabaseServerClient from "./createSupabaseServerClient";

export default async function getSessionFromServer() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    return data.session;
}
