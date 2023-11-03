import useRenameTodoList from "@/hooks/useRenameTodoList";

type UseRenameTodoListReturn = ReturnType<typeof useRenameTodoList>;

interface RenameDialogProps {
    listId: string;
    listTitle: string;
    open: boolean;
    onClose: () => void;
    onRename: UseRenameTodoListReturn["mutate"];
    status: UseRenameTodoListReturn["status"];
}
