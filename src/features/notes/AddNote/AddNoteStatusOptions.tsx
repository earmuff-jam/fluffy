import * as React from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { STATUS_OPTIONS } from '@common/StatusOptions/constants';


interface IAddNoteStatusOptionsProps {
    label: string;
    value: string;
    name: string;
    handleStatus: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddNoteStatusOptions: React.FunctionComponent<IAddNoteStatusOptionsProps> = ({ label, value, name, handleStatus }) => {
    return (
        <FormControl fullWidth>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Select
                size="small"
                labelId="status-selector-labelId"
                id="status-selector"
                variant="standard"
                name={name}
                value={value}
                onChange={handleStatus}
            >
                {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                        {option.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AddNoteStatusOptions;
