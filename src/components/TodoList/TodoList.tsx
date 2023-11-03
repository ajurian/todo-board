"use client";

import TodoItem from "@/components/TodoItem";
import AddTodo from "@/components/TodoList/AddTodo";
import ListMenu from "@/components/TodoList/ListMenu";
import RenameDialog from "@/components/TodoList/RenameDialog";
import useAddTodoItem from "@/hooks/useAddTodoItem";
import useDeleteTodoList from "@/hooks/useDeleteTodoList";
import useDuplicateTodoItem from "@/hooks/useDuplicateTodoItem";
import useEditTodoItem from "@/hooks/useEditTodoItem";
import useRenameTodoList from "@/hooks/useRenameTodoList";
import { MoreVert } from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function TodoList({
    id = "",
    title = "",
    items = [],
    creationPending = false,
}: TodoListComponentProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);

    const {
        mutate: renameTodoList,
        status: renameTodoListStatus,
        variables: renameTodoListVariables,
    } = useRenameTodoList();

    const { mutate: deleteTodoList, status: deleteTodoListStatus } =
        useDeleteTodoList();

    const pending = creationPending || deleteTodoListStatus === "pending";
    const isRenameTodoListPending = renameTodoListStatus === "pending";

    const {
        mutate: addTodoItem,
        status: addTodoItemStatus,
        variables: addTodoItemVariables,
    } = useAddTodoItem();

    const {
        mutate: editTodoItem,
        status: editTodoItemStatus,
        variables: editTodoItemVariables,
    } = useEditTodoItem();

    const {
        mutate: duplicateTodoItem,
        status: duplicateTodoItemStatus,
        variables: duplicateTodoItemVariables,
    } = useDuplicateTodoItem();

    return (
        <Paper
            sx={(theme) => ({
                minWidth: theme.spacing(88),
                maxWidth: theme.spacing(88),
                maxHeight: `calc(100vh - ${theme.spacing(26)})`,
                display: "flex",
                flexDirection: "column",
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    p: 3,
                    gap: 1.5,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        opacity: pending || isRenameTodoListPending ? 0.5 : 1,
                        whiteSpace: "pre-wrap",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                    }}
                >
                    {isRenameTodoListPending
                        ? renameTodoListVariables?.newTitle
                        : title}
                </Typography>
                {pending || isRenameTodoListPending ? (
                    <CircularProgress size="1.5rem" sx={{ m: "5px" }} />
                ) : (
                    <IconButton
                        size="small"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <MoreVert />
                    </IconButton>
                )}
            </Box>
            {((items && items.length > 0) ||
                addTodoItemStatus === "pending" ||
                duplicateTodoItemStatus === "pending") && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 3,
                        gap: 3,
                        px: 3,
                        overflow: "auto",
                    }}
                >
                    {items?.map((props, idx) =>
                        editTodoItemStatus === "pending" &&
                        props.id === editTodoItemVariables?.id ? (
                            <TodoItem
                                key={idx}
                                listTitle={title}
                                onDuplicate={duplicateTodoItem}
                                onEdit={editTodoItem}
                                editStatus={editTodoItemStatus}
                                {...props}
                                title={editTodoItemVariables?.newTitle}
                                description={
                                    editTodoItemVariables?.newDescription
                                }
                            />
                        ) : (
                            <TodoItem
                                key={idx}
                                listTitle={title}
                                onDuplicate={duplicateTodoItem}
                                onEdit={editTodoItem}
                                {...props}
                            />
                        )
                    )}
                    {addTodoItemStatus === "pending" && (
                        <TodoItem
                            title={addTodoItemVariables?.title}
                            description={addTodoItemVariables?.description}
                            creationPending
                        />
                    )}
                    {duplicateTodoItemStatus === "pending" && (
                        <TodoItem
                            title={duplicateTodoItemVariables?.title}
                            description={
                                duplicateTodoItemVariables?.description
                            }
                            creationPending
                        />
                    )}
                </Box>
            )}
            <AddTodo
                listId={id}
                listTitle={title}
                status={addTodoItemStatus}
                onAdd={addTodoItem}
                disabled={pending}
            />
            <ListMenu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onRenameClick={() => setRenameDialogOpen(true)}
                onDeleteClick={() => deleteTodoList({ id })}
            />
            <RenameDialog
                listId={id}
                listTitle={title}
                open={renameDialogOpen}
                onClose={() => setRenameDialogOpen(false)}
                onRename={renameTodoList}
                status={renameTodoListStatus}
            />
        </Paper>
    );
}
