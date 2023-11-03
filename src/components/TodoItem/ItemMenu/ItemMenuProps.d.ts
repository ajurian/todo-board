interface ItemMenuProps {
    anchorEl: HTMLElement | null;
    onClose?: () => void;
    onViewClick?: () => void;
    onEditClick?: () => void;
    onDuplicateClick?: () => void;
}
