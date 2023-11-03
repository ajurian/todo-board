import { RenameDialogProps } from "@/components/TodoList/RenameDialog/RenameDialogProps";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";

export default function RenameDialog({
    listId,
    listTitle,
    open,
    onClose,
    onRename,
    status,
}: RenameDialogProps) {
    const [newTitle, setNewTitle] = useState(listTitle);

    const save = useCallback(() => {
        onClose();
        onRename({ id: listId, newTitle });
    }, [onClose, onRename, listId, newTitle]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            onTransitionEnter={() => setNewTitle(listTitle)}
            maxWidth="xs"
            fullWidth
            disableRestoreFocus
        >
            <DialogTitle>Rename</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    autoFocus
                    label="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.currentTarget.value)}
                    sx={{ mt: 1.5 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={save}
                    disabled={
                        listTitle === newTitle ||
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
