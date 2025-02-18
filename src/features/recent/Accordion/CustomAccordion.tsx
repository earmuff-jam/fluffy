import * as React from 'react';

import { Accordion, Skeleton } from '@mui/material';

import EmptyComponent from '@utils/EmptyComponent';
import CustomAccordionSummary from '@features/recent/Accordion/CustomAccordionSummary';
import CustomAccordionDetails from '@features/recent/Accordion/CustomAccordionDetails';
import { RECENT_ACTIVITY_TYPE_MAPPER } from '@features/recent/constants';

const CustomAccordion: React.FunctionComponent = () => {
  const recentActivities = [];
  const loading = false;

  React.useEffect(() => {
    if (!loading && recentActivities?.length === 0) {
      //   dispatch(profileActions.getRecentActivities());
    }
  }, [loading, recentActivities?.length]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }
  if (recentActivities == null || recentActivities?.length <= 0) {
    return <EmptyComponent subtitle="Add assets to view details about them" />;
  }

  return (
    <>
      {recentActivities.map((activity, index) => (
        <Accordion key={index} elevation={0} disableGutters>
          <CustomAccordionSummary
            title={activity.title}
            label={activity.custom_action}
            prefix={RECENT_ACTIVITY_TYPE_MAPPER[activity.type].display}
          />
          <CustomAccordionDetails index={index} activity={activity} />
        </Accordion>
      ))}
    </>
  );
};

export default CustomAccordion;
