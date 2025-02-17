import * as React from 'react';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';


interface ISelectedAssetMoreInformationCheckboxProps {
    isChecked: boolean,
    handleCheckbox: (target: string, isChecked: boolean) => void;
    target: string;
    label: string;
    icon: React.ReactElement;
}

const SelectedAssetMoreInformationCheckbox: React.FunctionComponent<ISelectedAssetMoreInformationCheckboxProps> = ({ isChecked, handleCheckbox, target, label, icon }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox checked={isChecked} onChange={(e) => handleCheckbox(target, e.target.checked)} color="primary" />
            }
            label={
                <Stack direction="row" alignItems="center">
                    {icon}
                    <Typography variant="caption">{label}</Typography>
                </Stack>
            }
        />
    );
};

export default SelectedAssetMoreInformationCheckbox;
