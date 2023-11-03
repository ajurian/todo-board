import { EditDialogProps } from "@/components/TodoItem/EditDialog/EditDialogProps";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";

export default function EditDialog({
    listTitle,
    itemId,
    itemTitle,
    itemDescription,
    open,
    onClose,
    onEdit,
    status,
}: EditDialogProps) {
    const [newTitle, setNewTitle] = useState(itemTitle);
    const [newDescription, setNewDescription] = useState(itemDescription);

    const save = useCallback(() => {
        onClose();
        onEdit?.({ id: itemId, newTitle, newDescription });
    }, [onClose, onEdit, itemId, newTitle, newDescription]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            onTransitionEnter={() => {
                setNewTitle(itemTitle);
                setNewDescription(itemDescription);
            }}
            maxWidth="sm"
            fullWidth
            disableRestoreFocus
        >
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <DialogContentText>{listTitle}</DialogContentText>
                <TextField
                    required
                    fullWidth
                    autoFocus
                    label="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.currentTarget.value)}
                    sx={{ mt: 4.5 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.currentTarget.value)}
                    sx={{ mt: 4.5 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={save}
                    disabled={
                        (itemTitle === newTitle &&
                            itemDescription === newDescription) ||
                        newTitle.length === 0 ||
                        status === "pending"
                    }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
