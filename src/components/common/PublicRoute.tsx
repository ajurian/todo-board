import getSessionFromServerComponent from "@/utils/getSessionFromServerComponent";
import { redirect } from "next/navigation";

export default async function PublicRoute({ children }: ComponentWithChildren) {
    const session = await getSessionFromServerComponent();

    // user is signed in, redirect to home page
    // no need to authenticate
    if (session) {
        return redirect("/");
    }

    // user is not signed in yet
    // let him authenticate
    return <>{children}</>;
}
