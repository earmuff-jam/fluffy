import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CloseRounded, NoteRounded } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

export default function SelectedAssetReturnInformationContent({
  formFields,
  handleInputChange,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNote,
}) {
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
            id="returnDatetime"
            disablePast
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
}
