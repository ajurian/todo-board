import { PostgrestError, Session } from "@supabase/supabase-js";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Id } from "react-toastify";

interface TodoContextValue {
    todoLists: TodoListWithItemsData[];
    status: "error" | "success" | "pending";
    error: PostgrestError | null;
}

interface TodoProviderProps extends ComponentWithChildren {}
