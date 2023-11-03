import Header from "@/components/Header";
import SessionProvider from "@/context/SessionProvider";
import TodoProvider from "@/context/TodoProvider";
import getSession from "@/utils/getSession";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const session = await getSession();

    if (!session) {
        // user is not signed in yet
        // redirect him to sign in page
        redirect("/auth/signin");
    }

    // user is signed in, show him the page
    return (
        <SessionProvider session={session}>
            <TodoProvider>
                <Header />
                {typeof children === "function" ? children(session) : children}
            </TodoProvider>
        </SessionProvider>
    );
}
