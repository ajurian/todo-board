import useEditTodoItem from "@/hooks/useEditTodoItem";

type UseEditTodoItemReturn = ReturnType<typeof useEditTodoItem>;

interface EditDialogProps {
    listTitle: string;
    itemId: string;
    itemTitle: string;
    itemDescription: string;
    open: boolean;
    onClose: () => void;
    onEdit?: UseEditTodoItemReturn["mutate"];
    status?: UseEditTodoItemReturn["status"];
}
