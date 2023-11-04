"use client";

import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function ViewDialog({
    listTitle,
    itemTitle,
    itemDescription,
    open,
    onClose,
}: ViewDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ wordBreak: "break-word" }}>
                {listTitle}
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2">Title</Typography>
                <Typography sx={{ mt: 0.5, wordBreak: "break-word" }}>
                    {itemTitle}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 3 }}>
                    Description
                </Typography>
                <Typography
                    component="pre"
                    sx={{
                        mt: 0.5,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {itemDescription}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
