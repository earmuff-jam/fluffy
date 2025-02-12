import * as React from "react";

import { Alert, AlertProps, Grow, GrowProps, Snackbar } from "@mui/material";

interface ICustomSnackbarProps {
  open: boolean;
  handleClose: () => void;
  message?: string;
  severity?: AlertProps["severity"];
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

const CustomSnackbar: React.FunctionComponent<ICustomSnackbarProps> = ({
  open,
  handleClose,
  message,
  severity,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      TransitionComponent={GrowTransition}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
