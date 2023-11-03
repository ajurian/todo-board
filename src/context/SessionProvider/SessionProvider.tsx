"use client";

import {
    SessionContextValue,
    SessionProviderProps,
} from "@/context/SessionProvider/SessionProviderProps";
import { createContext, useContext } from "react";

/* @ts-ignore */
const SessionContext = createContext<SessionContextValue>();

export const useSession = () => useContext(SessionContext);

export default function SessionProvider({
    session,
    children,
}: SessionProviderProps) {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}
