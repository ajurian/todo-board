import useDuplicateTodoItem from "@/hooks/useDuplicateTodoItem";
import useEditTodoItem from "@/hooks/useEditTodoItem";

type UseDuplicateTodoItemReturn = ReturnType<typeof useDuplicateTodoItem>;
type UseEditTodoItemReturn = ReturnType<typeof useEditTodoItem>;

interface TodoItemProps extends Partial<TodoItemData> {
    listTitle?: string;
    creationPending?: boolean;
    onDuplicate?: UseDuplicateTodoItemReturn["mutate"];
    onEdit?: UseEditTodoItemReturn["mutate"];
    editStatus?: UseEditTodoItemReturn["status"];
}
