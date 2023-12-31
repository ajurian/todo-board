import Header from "@/components/Header";
import SessionProvider from "@/context/SessionProvider";
import TodoProvider from "@/context/TodoProvider";
import getSessionFromServerComponent from "@/utils/getSessionFromServerComponent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const session = await getSessionFromServerComponent();

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
