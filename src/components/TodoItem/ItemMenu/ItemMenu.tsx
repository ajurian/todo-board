import { ControlPointDuplicate, Edit, Visibility } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

export default function ItemMenu({
    anchorEl,
    onClose,
    onViewClick,
    onEditClick,
    onDuplicateClick,
}: ItemMenuProps) {
    const closeMenu = (callback?: () => void) => {
        onClose?.();
        callback?.();
    };

    return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
            <MenuItem onClick={() => closeMenu(onViewClick)}>
                <ListItemIcon>
                    <Visibility fontSize="small" />
                </ListItemIcon>
                View
            </MenuItem>
            <MenuItem onClick={() => closeMenu(onEditClick)}>
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={() => closeMenu(onDuplicateClick)}>
                <ListItemIcon>
                    <ControlPointDuplicate fontSize="small" />
                </ListItemIcon>
                Duplicate
            </MenuItem>
        </Menu>
    );
}
