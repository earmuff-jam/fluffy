
// Snackbar content valid types
export type SnackbarContent = {
  open: boolean;
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
};
