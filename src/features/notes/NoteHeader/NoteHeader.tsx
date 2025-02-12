import * as React from 'react';
import { AddRounded } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

interface INoteHeaderProps {
    handleClick: () => void;
}

const NoteHeader: React.FunctionComponent<INoteHeaderProps> = ({ handleClick }) => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" color="text.secondary" gutterBottom>
                Notes
            </Typography>
            <IconButton onClick={handleClick} size="small" data-tour="notes-1">
                <AddRounded fontSize="small" />
            </IconButton>
        </Stack>
    );
};

export default NoteHeader;
