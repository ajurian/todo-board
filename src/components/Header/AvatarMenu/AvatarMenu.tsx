import useAuth from "@/hooks/useAuth";
import { Logout } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

export default function SettingsMenu({
    anchorEl,
    setAnchorEl,
}: AvatarMenuProps) {
    const closeMenu = () => setAnchorEl(null);
    const { signOut } = useAuth();

    const handleSignOut = () => {
        closeMenu();
        signOut();
    };

    return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Sign out
            </MenuItem>
        </Menu>
    );
}
