import { useState } from 'react';

import { enqueueSnackbar } from 'notistack';

import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { CloseRounded, CloudCircleRounded, InfoRounded } from '@mui/icons-material';

import ViewFileContent from '@features/Assets/AddAssetsInBulk/ViewFileContent';

export default function ImagePicker({ id, name, handleUpload, handleCancel, disableCancel = false }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileDetails, setFileDetails] = useState({ name: '', lastModifiedDate: '', size: '' });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const imageType = file.type.includes('image');
      if (sizeInMB > 2.0 || !imageType) {
        enqueueSnackbar('Image is not valid or exceeds 2mb size limit.', {
          variant: 'error',
        });
      }
      setSelectedImage(file);
      setFileDetails({ name: file.name, lastModifiedDate: file.lastModifiedDate, size: file.size });
    }
    event.target.value = null;
  };

  const handleRemove = () => {
    setFileDetails({ name: '', lastModifiedDate: '', size: '' });
    setSelectedImage(null);
  };

  const submit = () => {
    handleUpload(id, selectedImage);
    setSelectedImage(null);
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.2} alignItems={'center'}>
        <Tooltip title="Images should be less than 2mb and be of either png, jpg, jpeg or svg format">
          <InfoRounded sx={{ color: 'grey' }} fontSize="small" />
        </Tooltip>
        <Typography flexGrow={1} variant="caption">
          Select an image to associate with {name || ''}
        </Typography>
        {!disableCancel ? (
          <IconButton color="error" size="small" onClick={handleCancel}>
            <CloseRounded fontSize="small" />
          </IconButton>
        ) : null}
      </Stack>
      <ViewFileContent
        handleRemove={handleRemove}
        showContent={Boolean(fileDetails?.name.length)}
        name={fileDetails.name}
        lastModifiedDate={fileDetails.lastModifiedDate}
        size={fileDetails.size}
      />
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
        <Button
          variant="outlined"
          component="label"
          onChange={handleFileUpload}
          disabled={Boolean(fileDetails?.name.length)}
        >
          Upload File
          <input type="file" hidden />
        </Button>
        <Button startIcon={<CloudCircleRounded />} disabled={!selectedImage} onClick={submit}>
          Upload
        </Button>
      </Stack>
    </Stack>
  );
}
