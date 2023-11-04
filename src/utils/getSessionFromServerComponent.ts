import createSupabaseServerComponentClient from "./createSupabaseServerComponentClient";

export default async function getSessionFromServerComponent() {
    const supabase = createSupabaseServerComponentClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    return data.session;
}
