import createSupabaseServerClient from "@/utils/createSupabaseServerClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(
                new URL(`/${next.slice(1)}`, request.url)
            );
        }
    }

    return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}
