import * as React from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface ISimpleModalProps {
  title: string;
  subtitle: string;
  handleClose: () => void;
  maxSize: Breakpoint | undefined;
  showSecondaryButton?: boolean;
  disableSecondaryButton?: boolean;
  secondaryButtonAction?: () => void;
  secondaryButtonIcon?: React.ReactNode;
  children: React.ReactNode;
}

const SimpleModal: React.FunctionComponent<ISimpleModalProps> = (props) => {
  const {
    title,
    subtitle,
    handleClose,
    maxSize = "xl",
    showSecondaryButton = false,
    disableSecondaryButton,
    secondaryButtonAction,
    secondaryButtonIcon,
    children,
  } = props;

  return (
    <Dialog open={true} onClose={handleClose} maxWidth={maxSize} fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            {title}
            {subtitle ? (
              <Typography variant="caption">{subtitle}</Typography>
            ) : null}
          </Stack>
          <Stack direction="row" alignItems="center">
            {showSecondaryButton && (
              <IconButton
                color="primary"
                onClick={secondaryButtonAction}
                disabled={disableSecondaryButton}
              >
                {secondaryButtonIcon}
              </IconButton>
            )}
            <IconButton aria-label="close" onClick={handleClose} color="error">
              <CloseRounded />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "40rem", overflow: "auto" }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleModal;
