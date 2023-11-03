"use client";

import createSupabaseBrowserClient from "@/utils/createSupabaseBrowserClient";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTodoList() {
    const supabase = createSupabaseBrowserClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: mutate,
        status,
        variables,
    } = useMutation<void, PostgrestError, { id: string }>({
        mutationFn: async ({ id }) => {
            const { error } = await supabase
                .from("todoLists")
                .delete()
                .eq("id", id);

            if (error) {
                throw error;
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    return { mutate, status, variables };
}
