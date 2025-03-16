import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { OnlinePredictionRounded, SubjectRounded, UpdateRounded } from '@mui/icons-material';

dayjs.extend(relativeTime);

const BIO_PLACEHOLDER = 'Add short bio about yourself to let others know details about you.';

export default function UserDetails({ aboutMe, updatedAt }) {
  return (
    <Paper
      sx={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      data-tour="profile-3"
    >
      <Typography variant="h5" color="text.secondary">
        User details
      </Typography>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Typography variant="caption" color="text.secondary">
        {aboutMe || BIO_PLACEHOLDER}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Stack spacing={1} data-tour="profile-4">
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <OnlinePredictionRounded color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Online
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <SubjectRounded color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Displaying assets in ordered list
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <UpdateRounded color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Last updated at : {dayjs(updatedAt).fromNow()}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
