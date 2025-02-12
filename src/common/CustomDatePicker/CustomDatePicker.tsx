import * as React from 'react';
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface ICustomDatePickerProps {
    label: string;
    completionDate: Dayjs;
    setCompletionDate: (value: Dayjs) => void;
}

const CustomDatePicker: React.FunctionComponent<ICustomDatePickerProps> = ({ label, completionDate, setCompletionDate }) => {
    return (
        <>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    disablePast
                    value={completionDate}
                    onChange={setCompletionDate}
                    slotProps={{
                        textField: {
                            size: 'small',
                        },
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default CustomDatePicker;
