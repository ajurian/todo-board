import getSession from "@/utils/getSession";
import { redirect } from "next/navigation";

export default async function PublicRoute({ children }: ComponentWithChildren) {
    const session = await getSession();

    // user is signed in, redirect to home page
    // no need to authenticate
    if (session) {
        return redirect("/");
    }

    // user is not signed in yet
    // let him authenticate
    return <>{children}</>;
}
