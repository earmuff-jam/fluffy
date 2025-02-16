import * as React from 'react';

import { MenuOutlined } from '@mui/icons-material';

import { IconButton, Stack, Typography } from '@mui/material';

interface ICustomMuiAppToolbarTitleProps {
    onClick: () => void;
}

const CustomMuiAppToolbarTitle: React.FunctionComponent<ICustomMuiAppToolbarTitleProps> = ({ onClick }) => {
    return (
        <>
            <IconButton size="medium" onClick={onClick}>
                <MenuOutlined fontSize="medium" />
            </IconButton>
            <Stack flexGrow={1} direction="row" alignItems="center">
                <Typography variant="h4" color="text.secondary" sx={{ cursor: 'pointer' }}>
                    Fleetwise
                </Typography>
            </Stack>
        </>
    );
};

export default CustomMuiAppToolbarTitle;
