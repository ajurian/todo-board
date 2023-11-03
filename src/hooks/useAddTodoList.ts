"use client";

import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddTodoList() {
    const supabase = createSupabaseBrowserClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: mutate,
        status,
        variables,
    } = useMutation<
        TodoListData,
        PostgrestError,
        { ownerId: string; title: string }
    >({
        mutationFn: async ({ ownerId, title }) => {
            const { data, error } = await supabase
                .from("todoLists")
                .insert({ ownerId, title })
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
