// used for variantions between text fields color
export type TextFieldVariants = 'outlined' | 'filled' | 'standard';
// used for variants between text field sizes
export type TextFieldSizeVariants = 'small' | 'medium';
// used for variants between different values for text field
// export type TextFieldValueVariants = string | number | boolean | string[] | null;

// used for the tour component
export type TourStepsType = {
  title: string;
};

// Location type for geom point
export type LocationType = {
  lat: number;
  lon: number;
};

// Audit Columns
export type AuditColumns = {
  createdAt: string;
  createdBy: string;
  creator: string;
  updatedAt: string;
  updatedBy: string;
  updator: string;
  collaborators: string[];
};

// Audit Columns form mode
export type AuditColumnsFormField = {
  createdAt: FormField;
  createdBy: FormField;
  creator: FormField;
  updatedAt: FormField;
  updatedBy: FormField;
  updator: FormField;
  collaborators: FormField;
};

// Collaborators and users in sharable groups
export type Collaborator = {
  display: string; // profile email
  value: string; // profile.id
  label: string; // profile email
};

// Snackbar content valid types
export type SnackbarContent = {
  open: boolean;
  message: string | null;
  severity: 'success' | 'error' | 'info' | 'warning';
};

// validator type
type Validator = {
  validate: (value: string) => boolean;
  message: string;
};

// common form field types
export type FormField = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string | number | boolean | string[] | null;
  type?: string;
  variant?: TextFieldVariants;
  size?: TextFieldSizeVariants;
  errorMsg: string;
  required?: boolean;
  fullWidth?: boolean;
  rows?: number | null;
  multiline?: boolean | null;
  validators?: Validator[];
};
