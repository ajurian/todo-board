import PublicRoute from "@/components/common/PublicRoute";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Sign In | Todo Board",
};

export default function SigninLayout({ children }: ComponentWithChildren) {
    return <PublicRoute>{children}</PublicRoute>;
}
