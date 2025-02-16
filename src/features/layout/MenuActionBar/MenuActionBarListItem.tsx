import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';

interface IMenuActionBarListItemProps {
    label: string;
    icon: React.ReactElement;
    isSelected: boolean;
    handleClick: () => void;
    rowReverse?: boolean
}

const MenuActionBarListItem: React.FunctionComponent<IMenuActionBarListItemProps> = ({
    label, icon, isSelected, handleClick, rowReverse = false
}) => {
    const theme = useTheme();
    return (
        <ListItemButton selected={isSelected} onClick={handleClick} sx={{ flexDirection: rowReverse && 'row-reverse' }}>
            <ListItemIcon sx={{ color: isSelected && theme.palette.primary.main }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export default MenuActionBarListItem;
