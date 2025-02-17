import * as React from 'react';

import { IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';

import { CloseRounded, NoteRounded } from '@mui/icons-material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AssetDetailsFormFieldType } from '@features/assets/types';
import { Dayjs } from 'dayjs';

interface ISelectedAssetReturnInformationContentProps {
    formFields: AssetDetailsFormFieldType;
    handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    returnDateTime: Dayjs;
    setReturnDateTime: (date: Dayjs) => void;
    openReturnNote: boolean;
    setOpenReturnNote: (value: boolean) => void;
}

const SelectedAssetReturnInformationContent: React.FunctionComponent<ISelectedAssetReturnInformationContentProps> = ({
    formFields,
    handleInputChange,
    returnDateTime,
    setReturnDateTime,
    openReturnNote,
    setOpenReturnNote,
}) => {
    return (
        <>
            <Stack flexGrow={1}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {formFields.returnLocation.label}
                </Typography>
                <TextField
                    id={formFields.returnLocation.name}
                    name={formFields.returnLocation.name}
                    value={formFields.returnLocation.value}
                    size={formFields.returnLocation.size}
                    placeholder={formFields.returnLocation.placeholder}
                    onChange={handleInputChange}
                    required={formFields.returnLocation.required}
                    fullWidth={formFields.returnLocation.fullWidth}
                    error={Boolean(formFields.returnLocation.errorMsg)}
                    helperText={formFields.returnLocation.errorMsg}
                    variant={formFields.returnLocation.variant}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Tooltip title="Add more information on return">
                                    <IconButton size="small" onClick={() => setOpenReturnNote(!openReturnNote)}>
                                        {!openReturnNote ? <NoteRounded /> : <CloseRounded />}
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Return datetime
                    </Typography>
                    <DatePicker
                        disablePast
                        name='returnDatetime'
                        value={returnDateTime}
                        onChange={setReturnDateTime}
                        slotProps={{
                            textField: {
                                size: 'small',
                            },
                        }}
                    />
                </LocalizationProvider>
            </Stack>
        </>
    );
};

export default SelectedAssetReturnInformationContent;
