"use client";

import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { useRouter } from "next/navigation";

export default function useAuth() {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const signUp = async (email: string, password: string) => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();
    };

    const signInWithPassword = async (email: string, password: string) => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        });
        router.refresh();
    };

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        });
        router.refresh();
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return { signUp, signInWithPassword, signInWithGoogle, signOut };
}
