import { Stack, TextField, InputAdornment } from '@mui/material';

export default function LoginFormFields({ formFields, handleInput, submit }) {
  return (
    <Stack spacing={2}>
      <TextField
        id={formFields['email'].name}
        name={formFields['email'].name}
        label={formFields['email'].label}
        size={formFields['email'].size}
        value={formFields['email'].value}
        type={formFields['email'].type}
        variant={formFields['email'].variant}
        autoComplete={formFields['email'].autocomplete}
        placeholder={formFields['email'].placeholder}
        onChange={handleInput}
        required={formFields['email'].required}
        fullWidth={formFields['email'].fullWidth}
        error={!!formFields['email'].errorMsg}
        helperText={formFields['email'].errorMsg}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            submit(e);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{formFields['email'].icon}</InputAdornment>,
        }}
      />
      <TextField
        id={formFields['password'].name}
        name={formFields['password'].name}
        label={formFields['password'].label}
        size={formFields['password'].size}
        value={formFields['password'].value}
        type={formFields['password'].type}
        variant={formFields['password'].variant}
        autoComplete={formFields['password'].autocomplete}
        placeholder={formFields['password'].placeholder}
        onChange={handleInput}
        required={formFields['password'].required}
        fullWidth={formFields['password'].fullWidth}
        error={!!formFields['password'].errorMsg}
        helperText={formFields['password'].errorMsg}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            submit(e);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{formFields['password'].icon}</InputAdornment>,
        }}
      />
    </Stack>
  );
}
