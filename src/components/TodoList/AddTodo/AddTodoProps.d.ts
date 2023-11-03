import useAddTodoItem from "@/hooks/useAddTodoItem";

type UseAddTodoItemReturn = ReturnType<typeof useAddTodoItem>;

interface AddTodoProps {
    listId: string;
    listTitle: string;
    onAdd: UseAddTodoItemReturn["mutate"];
    status: UseAddTodoItemReturn["status"];
    disabled?: boolean;
}
