"use client";

import { AddListProps } from "@/components/TodoBoard/AddList/AddListProps";
import { useSession } from "@/context/SessionProvider";
import { Add } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function AddList({ onAdd, status }: AddListProps) {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const session = useSession();

    const closeDialog = () => setOpen(false);

    const addList = useCallback(async () => {
        closeDialog();
        onAdd(
            { ownerId: session.user.id, title },
            {
                onError: ({ message }) => toast.error(message),
            }
        );
    }, [onAdd, title, session.user.id]);

    return (
        <>
            <Button
                variant="contained"
                disabled={status === "pending"}
                startIcon={<Add />}
                onClick={() => setOpen(true)}
                sx={(theme) => ({
                    minWidth: theme.spacing(88),
                    display: "flex",
                    justifyContent: "left",
                })}
            >
                Add New List
            </Button>
            <Dialog
                open={open}
                onClose={closeDialog}
                onTransitionEnter={() => setTitle("")}
                maxWidth="xs"
                fullWidth
                disableRestoreFocus
            >
                <DialogTitle>New List</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        sx={{ mt: 1.5 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        onClick={addList}
                        disabled={title.length === 0 || status === "pending"}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
