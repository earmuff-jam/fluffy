import * as React from 'react';

import { Stack, Typography } from '@mui/material';

import { CreateNewFolderRounded } from '@mui/icons-material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalizeFirstLetter } from '@utils/utility';
import CustomTimeline from '@features/recent/CustomTimeline/CustomTimeline';
import { RECENT_ACTIVITY_TYPE_MAPPER } from '@features/recent/constants';
import { RecentActivityType } from '@features/recent/types';

dayjs.extend(relativeTime);

interface IRecentActivityProps {
  activity: RecentActivityType;
}

const RecentActivity: React.FunctionComponent<IRecentActivityProps> = ({ activity }) => {
  return (
    <Stack key={activity.id} sx={{ borderRadius: '0.2rem', alignItems: 'flex-start' }}>
      <CustomTimeline
        color="primary"
        icon={<CreateNewFolderRounded fontSize="small" />}
        label={`${capitalizeFirstLetter(activity.custom_action)} ${activity.title}`}
        secondaryLabel={`${RECENT_ACTIVITY_TYPE_MAPPER[activity.type].display}`}
      />
      <Typography variant="caption" alignSelf="flex-end">
        {`Occured around ${dayjs(activity?.createdAt).fromNow()} by ${activity?.creator}`}
      </Typography>
    </Stack>
  );
};

export default RecentActivity;
