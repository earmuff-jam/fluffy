import dayjs from 'dayjs';

import { Stack, Typography } from '@mui/material';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalizeFirstLetter } from '@utils/utils';
import { CreateNewFolderRounded } from '@mui/icons-material';
import StyledTimeline from '@features/RecentActivities/StyledTimeline';

const RecentActivity = ({ activity, prefix }) => {
  dayjs.extend(relativeTime);
  return (
    <Stack key={activity.id} sx={{ borderRadius: '0.2rem', alignItems: 'flex-start' }}>
      <StyledTimeline
        color="primary"
        icon={<CreateNewFolderRounded fontSize="small" />}
        label={`${capitalizeFirstLetter(activity?.status || '')} ${activity.name}`}
        secondaryLabel={prefix}
      />
      <Typography variant="caption" alignSelf="flex-end">
        {`Occured around ${dayjs(activity?.createdAt).fromNow()} by ${activity?.createdBy.emailAddress}`}
      </Typography>
    </Stack>
  );
};

export default RecentActivity;
