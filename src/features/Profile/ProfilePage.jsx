import { useState } from 'react';

import { useTheme } from '@emotion/react';

import { Paper, Stack, useMediaQuery } from '@mui/material';

import SimpleModal from '@utils/SimpleModal';
import UserStatus from '@features/Profile/UserStatus';
import ProfileForm from '@features/Profile/ProfileForm';

import { useAuthenticator } from '@aws-amplify/ui-react';
import UserDetails from '@features/Profile/UserDetails';
import UserDemographics from '@features/Profile/UserDemographics';
import AppearanceSettings from '@features/Profile/AppearanceSettings';

import { useFetchUserProfileDetails, useFetchUserProfileStats } from '@services/profileApi';

const ProfilePage = () => {
  const theme = useTheme();
  const { user } = useAuthenticator();
  const smallFormFactor = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, isLoading } = useFetchUserProfileDetails(user.userId);
  const { data: profileStats, isLoading: isProfileStatsLoading } = useFetchUserProfileStats(user.userId);

  const [editMode, setEditMode] = useState(false);

  return (
    <Stack spacing={2} data-tour="profile-0">
      <Stack direction={smallFormFactor ? 'column' : 'row'} spacing={1}>
        <UserDemographics data={data} handleEditMode={() => setEditMode(!editMode)} />
        <UserDetails aboutMe={data?.aboutMe} updatedAt={data?.updatedAt} />
      </Stack>
      <Paper sx={{ padding: '1rem' }} data-tour="profile-5">
        <UserStatus
          profileStats={profileStats}
          smallFormFactor={smallFormFactor}
          isProfileStatsLoading={isProfileStatsLoading}
        />
      </Paper>
      <Paper sx={{ padding: '1rem' }} data-tour="profile-6">
        <AppearanceSettings loading={isLoading} profileDetails={data} />
      </Paper>
      {editMode && (
        <SimpleModal
          open={editMode}
          handleClose={() => setEditMode(false)}
          maxSize={'xs'}
          title="Edit profile details"
          subtitle="Edit general details about yourself so others can notice you."
        >
          <ProfileForm handleClose={() => setEditMode(false)} />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default ProfilePage;
