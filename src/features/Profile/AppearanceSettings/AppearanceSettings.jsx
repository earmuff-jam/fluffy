import { useEffect, useState } from 'react';

import { DarkModeRounded, GridViewRounded } from '@mui/icons-material';
import { Box, Button, Checkbox, Divider, FormControlLabel, Skeleton, Stack, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useUpdateProfile } from '@services/profileApi';

const AppearanceSettings = ({ loading, profileDetails = {} }) => {
  const { mutate: updateProfile } = useUpdateProfile();
  const [displayMode, setDisplayMode] = useState(false);
  const [inventoryLayout, setInventoryLayout] = useState(false); // false is list view

  const handleSubmit = () => {
    const draftData = {
      ...profileDetails,
      appearance: displayMode,
      isGridView: inventoryLayout,
      updatedAt: dayjs().toISOString(),
    };
    updateProfile(draftData);
    enqueueSnackbar('Successfully updated profile details.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (!loading) {
      setDisplayMode(profileDetails.appearance ?? false);
      setInventoryLayout(profileDetails.isGridView ?? false);
    }
  }, [loading]);

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Appearance Settings
        </Typography>
        <Typography variant="caption" gutterBottom>
          Change the look and feel of the application.
        </Typography>
        <Divider />
      </Box>
      {loading ? (
        <Skeleton height="5rem" />
      ) : (
        <Stack spacing={2}>
          <FormControlLabel
            control={<Checkbox checked={displayMode} onChange={() => setDisplayMode(!displayMode)} color="primary" />}
            label={
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DarkModeRounded color={displayMode ? 'primary' : 'secondary'} />
                  <Typography variant="caption">Enable dark mode</Typography>
                </Stack>
                <Typography variant="caption" gutterBottom>
                  Switch to dark mode.
                </Typography>
              </Stack>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={inventoryLayout}
                onChange={() => setInventoryLayout(!inventoryLayout)}
                color="primary"
              />
            }
            label={
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <GridViewRounded color="primary" />
                  <Typography variant="caption">Enable grid mode for assets</Typography>
                </Stack>
                <Typography variant="caption" gutterBottom>
                  Switch between list view and grid view for viewing assets.
                </Typography>
              </Stack>
            }
          />
        </Stack>
      )}

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </>
  );
};
export default AppearanceSettings;
