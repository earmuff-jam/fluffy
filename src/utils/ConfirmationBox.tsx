import { Breakpoint, Button, Stack, Typography } from '@mui/material';
import SimpleModal from '@utils/SimpleModal';
import * as React from 'react';

interface IConfirmationBoxProps {
    title: string;
    handleClose: () => void;
    maxSize: Breakpoint;
    deleteID?: string | number;
    confirmDelete: (id: string | number) => void;
}

const ConfirmationBox: React.FunctionComponent<IConfirmationBoxProps> = ({ title, handleClose, maxSize, deleteID, confirmDelete }) => {
    return (
        <SimpleModal title={title} handleClose={handleClose} maxSize={maxSize}>
            <Typography variant="subtitle2">Delete this item?</Typography>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button onClick={handleClose}>Go back</Button>
                <Button variant="outlined" autoFocus onClick={() => confirmDelete(deleteID)}>
                    Confirm
                </Button>
            </Stack>
        </SimpleModal>
    );
};

export default ConfirmationBox;
