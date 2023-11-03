import PublicRoute from "@/components/common/PublicRoute";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Sign Up | Todo Board",
};

export default function SignupLayout({ children }: ComponentWithChildren) {
    return <PublicRoute>{children}</PublicRoute>;
}
