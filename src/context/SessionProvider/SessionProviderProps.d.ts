import { Session } from "@supabase/supabase-js";

type SessionContextValue = Session;

interface SessionProviderProps extends ComponentWithChildren {
    session: Session;
}
