"use client";

import EditDialog from "@/components/TodoItem/EditDialog";
import ItemMenu from "@/components/TodoItem/ItemMenu";
import { TodoItemProps } from "@/components/TodoItem/TodoItemProps";
import ViewDialog from "@/components/TodoItem/ViewDialog";
import useDeleteTodoItem from "@/hooks/useDeleteTodoItem";
import { Check, MoreVert } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TodoItem({
    id = "",
    listTitle = "",
    listId = "",
    title = "",
    description = "",
    creationPending = false,
    onDuplicate,
    onEdit,
    editStatus,
}: TodoItemProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const { mutate: deleteTodoItem, status: deleteTodoItemStatus } =
        useDeleteTodoItem();

    const pending =
        creationPending ||
        deleteTodoItemStatus === "pending" ||
        editStatus === "pending";

    return (
        <Box sx={{ display: "flex", alignItems: "start", gap: 1.5 }}>
            <IconButton
                size="small"
                color="success"
                onClick={() => deleteTodoItem({ id })}
                disabled={pending}
            >
                <Check fontSize="small" />
            </IconButton>
            <Box
                sx={{
                    flexGrow: 1,
                    opacity: pending ? 0.5 : 1,
                    alignSelf: "center",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        whiteSpace: "pre-wrap",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                    }}
                >
                    {title}
                </Typography>
                {description.length > 0 && (
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 1,
                            whiteSpace: "pre-wrap",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>
            {pending ? (
                <CircularProgress size="1.25rem" sx={{ m: "5px" }} />
            ) : (
                <IconButton
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    <MoreVert fontSize="small" />
                </IconButton>
            )}
            <ItemMenu
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onViewClick={() => setViewDialogOpen(true)}
                onEditClick={() => setEditDialogOpen(true)}
                onDuplicateClick={() =>
                    onDuplicate?.(
                        { listId, title, description },
                        {
                            onError: ({ message }) => toast.error(message),
                        }
                    )
                }
            />
            <ViewDialog
                listTitle={listTitle}
                itemTitle={title}
                itemDescription={description}
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
            />
            <EditDialog
                listTitle={listTitle}
                itemId={id}
                itemTitle={title}
                itemDescription={description}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onEdit={onEdit}
                status={editStatus}
            />
        </Box>
    );
}
