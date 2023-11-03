"use client";

import { AddTodoProps } from "@/components/TodoList/AddTodo/AddTodoProps";
import { Add } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function AddTodo({
    listId,
    listTitle,
    onAdd,
    status,
    disabled = false,
}: AddTodoProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    const closeDialog = () => setOpen(false);

    const addTodo = useCallback(() => {
        closeDialog();
        onAdd(
            { listId, title, description },
            {
                onError: ({ message }) => toast.error(message),
            }
        );
    }, [listId, title, description, onAdd]);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                sx={(theme) => ({
                    display: "flex",
                    justifyContent: "left",
                    m: 3,
                    width: `calc(100% - ${theme.spacing(6)})`,
                })}
                startIcon={<Add />}
                disabled={status === "pending" || disabled}
            >
                Add Todo
            </Button>
            <Dialog
                open={open}
                onClose={closeDialog}
                onTransitionEnter={() => {
                    setTitle("");
                    setDescription("");
                }}
                maxWidth="sm"
                fullWidth
                disableRestoreFocus
            >
                <DialogTitle>New Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>{listTitle}</DialogContentText>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        sx={{ mt: 4.5 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        sx={{ mt: 4.5 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={addTodo}
                        disabled={title.length === 0 || status === "pending"}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
