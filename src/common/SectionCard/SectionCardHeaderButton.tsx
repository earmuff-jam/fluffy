import * as React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { AddRounded, FileDownload } from "@mui/icons-material";

interface ISectionCardHeaderButtonProps {
  title: string;
  handleButtonClick: () => void;
  handleIconButtonClick: () => void;
  disableDownloadIcon: boolean;
  addBtnDataTour: string;
  downloadBtnDataTour: string;
}

const SectionCardHeaderButton: React.FunctionComponent<
  ISectionCardHeaderButtonProps
> = ({
  title,
  handleButtonClick,
  handleIconButtonClick,
  disableDownloadIcon,
  addBtnDataTour,
  downloadBtnDataTour,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={handleButtonClick}
        startIcon={<AddRounded />}
        variant="outlined"
        data-tour={addBtnDataTour}
      >
        {title}
      </Button>
      <IconButton
        size="small"
        onClick={handleIconButtonClick}
        disabled={disableDownloadIcon}
        data-tour={downloadBtnDataTour}
      >
        <FileDownload fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SectionCardHeaderButton;
