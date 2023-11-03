import PublicRoute from "@/components/common/PublicRoute";
import React from "react";

export default function SignupLayout({ children }: ComponentWithChildren) {
    return <PublicRoute>{children}</PublicRoute>;
}
