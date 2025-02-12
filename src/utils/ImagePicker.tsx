import * as React from "react";

import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import {
  CloseRounded,
  CloudCircleRounded,
  InfoRounded,
} from "@mui/icons-material";

import CustomSnackbar from "@utils/Snackbar";
import { SnackbarContent } from "@utils/types";

interface IImagePickerProps {
  id: string;
  name: string;
  handleUpload: (id: string, selectedImage: File) => void;
  handleCancel: () => void;
  disableCancel?: boolean;
}

const ImagePicker: React.FunctionComponent<IImagePickerProps> = ({
  id,
  name,
  handleUpload,
  handleCancel,
  disableCancel = false,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
    {
      open: false,
      message: null,
      severity: "success",
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const imageType = file.type.includes("image");
    if (Number(sizeInMB) > 2.0 || !imageType) {
      setSnackbarContent({
        open: true,
        severity: "error",
        message: "Image is not valid or exceeds 2mb size limit.",
      });
      setSelectedImage(null);
    } else {
      setSelectedImage(file);
    }
  };

  const uploadFile = () => {
    handleUpload(id, selectedImage);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.2} alignItems={"center"}>
        <Tooltip title="Images should be less than 2mb and be of either png, jpg, jpeg or svg format">
          <InfoRounded sx={{ color: "grey" }} fontSize="small" />
        </Tooltip>
        <Typography flexGrow={1} variant="caption">
          Select an image to associate with {name || ""}
        </Typography>
        {!disableCancel ? (
          <IconButton color="error" size="small" onClick={handleCancel}>
            <CloseRounded fontSize="small" />
          </IconButton>
        ) : null}
      </Stack>
      <input
        type="file"
        style={{ cursor: "pointer" }}
        onChange={handleChange}
      />
      <Button
        startIcon={<CloudCircleRounded />}
        disabled={!selectedImage}
        onClick={uploadFile}
      >
        Upload
      </Button>
      <CustomSnackbar
        open={snackbarContent.open}
        message={snackbarContent.message}
        severity={snackbarContent.severity}
        handleClose={() =>
          setSnackbarContent({
            open: false,
            severity: "success",
            message: null,
          })
        }
      />
    </Stack>
  );
};

export default ImagePicker;
