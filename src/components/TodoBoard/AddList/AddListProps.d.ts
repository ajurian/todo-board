import useAddTodoList from "@/hooks/useAddTodoList";

type UseAddTodoListReturn = ReturnType<typeof useAddTodoList>;

interface AddListProps {
    onAdd: UseAddTodoListReturn["mutate"];
    status: UseAddTodoListReturn["status"];
}
