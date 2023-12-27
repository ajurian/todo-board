"use client";

import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { useRouter } from "next/navigation";

export default function useAuth() {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();

        return error;
    };

    const signInWithPassword = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        router.refresh();

        return error;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.refresh();

        return error;
    };

    return { signUp, signInWithPassword, signOut };
}
