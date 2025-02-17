import * as React from "react";
import { Stack, TextField, TextFieldVariants, Typography } from "@mui/material";

interface ITextFieldWithLabelProps {
  label?: string;
  caption?: string;
  id?: string;
  name: string;
  value: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean | null;
  multiline?: boolean | null;
  variant?: TextFieldVariants;
  size?: "small" | "medium";
  rows?: string | number | null;
  error?: boolean | null;
  helperText?: string | null;
}

const TextFieldWithLabel: React.FunctionComponent<ITextFieldWithLabelProps> = ({
  id,
  label,
  name,
  caption,
  value,
  placeholder,
  onChange,
  required,
  fullWidth,
  multiline = false,
  variant,
  size,
  rows = 0,
  error,
  helperText,
}) => {
  return (
    <Stack spacing={1} sx={{ flexGrow: 1 }}>
      <Stack spacing={0}>
        <Typography variant="subtitle2" color="text.secondary">
          {label} {required && "*"}
        </Typography>
        <Typography variant="caption" color={"text.secondary"}>
          {caption}
        </Typography>
      </Stack>
      <TextField
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        variant={variant}
        required={required}
        size={size}
        multiline={multiline}
        error={error}
        rows={rows}
        fullWidth={fullWidth}
        helperText={helperText}
      />
    </Stack>
  );
};

export default TextFieldWithLabel;
