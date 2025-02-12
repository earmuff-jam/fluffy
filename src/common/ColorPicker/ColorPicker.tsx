import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

interface IColorPickerProps {
    label: string,
    value: string,
    handleChange: (value: string) => void;
}

const ColorPicker: React.FunctionComponent<IColorPickerProps> = ({ label, value, handleChange }) => {
    return (
        <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <MuiColorInput
                size="small"
                fullWidth
                format="hex"
                value={value}
                onChange={handleChange}
                placeholder="Select a color"
            />
        </Stack>
    );
};

export default ColorPicker;
