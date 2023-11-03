"use client";

import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDuplicateTodoItem() {
    const supabase = createSupabaseBrowserClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: mutate,
        status,
        variables,
    } = useMutation<
        TodoItemData,
        PostgrestError,
        Omit<TodoItemData, "id" | "createdAt">
    >({
        mutationFn: async ({ listId, title, description }) => {
            const { data, error } = await supabase
                .from("todoItems")
                .insert({ listId, title, description })
                .select()
                .single();

            if (error) {
                throw error;
            }

            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    return { mutate, status, variables };
}
