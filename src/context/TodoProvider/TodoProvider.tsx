"use client";

import { useSession } from "@/context/SessionProvider";
import {
    TodoContextValue,
    TodoProviderProps,
} from "@/context/TodoProvider/TodoProviderProps";
import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

/* @ts-ignore */
const TodoContext = createContext<TodoContextValue>({});

export const useTodo = () => useContext(TodoContext);

export default function TodoProvider({ children }: TodoProviderProps) {
    const supabase = createSupabaseBrowserClient();
    const session = useSession();

    const {
        data: todoLists,
        status,
        error,
    } = useQuery<TodoListWithItemsData[], PostgrestError>({
        queryKey: ["todos", session.user.id],
        retry: false,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todoListsWithItems")
                .select()
                .eq("ownerId", session.user.id)
                .order("createdAt", { ascending: true });

            if (error) {
                throw error;
            }

            return data || [];
        },
    });

    return (
        <TodoContext.Provider
            value={{
                todoLists: todoLists ?? [],
                status,
                error,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}
