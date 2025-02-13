// used for variantions between text fields color
export type TextFieldVariants = "outlined" | "filled" | "standard";
// used for variants between text field sizes
export type TextFieldSizeVariants = "small" | "medium";

// Snackbar content valid types
export type SnackbarContent = {
  open: boolean;
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
};

// validator type
type Validator = {
  validate: (value: string) => boolean;
  message: string;
};

// common form field types
export type FormField = {
  label: string;
  placeholder: string;
  value: string;
  name: string;
  variant: TextFieldVariants;
  size: TextFieldSizeVariants;
  errorMsg: string;
  required: boolean;
  fullWidth: boolean;
  rows?: number | null;
  multiline?: boolean | null;
  validators?: Validator[];
};
