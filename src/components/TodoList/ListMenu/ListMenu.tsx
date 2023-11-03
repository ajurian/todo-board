import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

export default function ListMenu({
    anchorEl,
    onClose,
    onRenameClick,
    onDeleteClick,
}: ListMenuProps) {
    const closeMenu = (callback?: () => void) => {
        onClose?.();
        callback?.();
    };

    return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
            <MenuItem onClick={() => closeMenu(onRenameClick)}>
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                Rename
            </MenuItem>
            <MenuItem onClick={() => closeMenu(onDeleteClick)}>
                <ListItemIcon>
                    <Delete fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Menu>
    );
}
