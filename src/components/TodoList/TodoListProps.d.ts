interface TodoListComponentProps extends Partial<TodoListData> {
    items?: TodoItemData[] | null;
    creationPending?: boolean;
}
