import * as React from 'react';

import { Divider, Stack } from '@mui/material';

import { DownloadRounded } from '@mui/icons-material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RowHeader from '@utils/RowHeader';
import CustomAccordion from '@features/recent/Accordion/CustomAccordion';

dayjs.extend(relativeTime);

const RecentActivities: React.FunctionComponent = () => {
  const downloadRecentActivities = () => {
    const last30Days = dayjs().subtract(30, 'days').format('YYYY-MM-DDTHH:mm:ssZ');
    // dispatch(profileActions.downloadRecentActivities({ last30Days }));
  };

  return (
    <Stack data-tour="recentActivities-0">
      <RowHeader
        title="Recent Activities"
        caption="View all of your recent activities here. You can view all associated activities performed by yourself. Track changes for the last ten assets. Download all recent activities for the past 30 days."
        primaryButtonTextLabel="Export"
        primaryStartIcon={<DownloadRounded />}
        handleClickPrimaryButton={downloadRecentActivities}
        primaryBtnDataTour="recentActivities-1"
      />
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <CustomAccordion />
    </Stack>
  );
};

export default RecentActivities;
