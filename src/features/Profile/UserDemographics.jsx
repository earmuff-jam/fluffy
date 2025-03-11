import { useEffect, useState } from 'react';

import { EditRounded } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';

import ImagePicker from '@common/ImagePicker';
import UserDemographicsRow from '@features/Profile/UserDemographicsRow';

export default function UserDemographics({ data = {}, handleEditMode }) {
  const avatar = {};
  const isAvatarLoading = false;

  const [editMode, setEditMode] = useState(false);

  const handleUpload = (id, selectedImage) => {
    // dispatch(profileActions.updateProfileImage({ id: id, selectedImage: selectedImage }));
    setEditMode(false);
  };

  useEffect(() => {
    // dispatch(profileActions.fetchAvatar());
  }, [isAvatarLoading]);

  return (
    <Paper sx={{ padding: '1rem' }}>
      <Stack alignItems={'center'} data-tour="profile-1">
        {editMode ? (
          <ImagePicker
            id={data.id}
            handleUpload={handleUpload}
            handleCancel={() => setEditMode(false)}
            name={data.username}
          />
        ) : (
          <Avatar
            sx={{ width: 100, height: 100, marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => setEditMode(true)}
            src={avatar}
          />
        )}

        <Stack direction={'row'} alignItems={'center'}>
          <IconButton size="small" onClick={handleEditMode}>
            <EditRounded fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="h5" color="text.secondary">
            {data?.firstName}
            {data?.lastName}
          </Typography>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">
          {data?.emailAddress}
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Stack spacing={1} data-tour="profile-2">
        <UserDemographicsRow>
          <Typography variant="subtitle2" color="text.secondary">
            Username
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.username}
          </Typography>
        </UserDemographicsRow>
        <UserDemographicsRow>
          <Typography variant="subtitle2" color="text.secondary">
            Email Address
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.emailAddress}
          </Typography>
        </UserDemographicsRow>
        <UserDemographicsRow>
          <Typography variant="subtitle2" color="text.secondary">
            Phone number
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.phoneNumber}
          </Typography>
        </UserDemographicsRow>
      </Stack>
    </Paper>
  );
}
