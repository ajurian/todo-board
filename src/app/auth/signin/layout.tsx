import PublicRoute from "@/components/common/PublicRoute";
import React from "react";

export default function SigninLayout({ children }: ComponentWithChildren) {
    return <PublicRoute>{children}</PublicRoute>;
}
