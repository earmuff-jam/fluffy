import { Accordion, Skeleton } from '@mui/material';

import { EmptyComponent } from '@common/utils';

import RecentActivityAccordionSummary from '@features/RecentActivities/RecentActivityAccordionSummary';
import RecentActivityAccordionDetails from '@features/RecentActivities/RecentActivityAccordionDetails';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useFetchUserRecentActivities } from '@services/profileApi';

const RecentActivityAccordion = () => {
  const { user } = useAuthenticator();
  const { data: recentActivities = {}, isLoading } = useFetchUserRecentActivities(user.userId, true);

  if (isLoading) {
    return <Skeleton height="20rem" />;
  }
  if (recentActivities == null) {
    return <EmptyComponent subtitle="Add assets to view details about them" />;
  }

  return (
    <>
      {recentActivities.categories.map((activity, index) => (
        <Accordion key={index} elevation={0} disableGutters>
          <RecentActivityAccordionSummary
            title={activity.name}
            label={activity.status}
            prefix={'Category Item'}
          />
          <RecentActivityAccordionDetails index={index} activity={activity} prefix={'Category Item'}/>
        </Accordion>
      ))}
      {recentActivities.maintenancePlans.map((activity, index) => (
        <Accordion key={index} elevation={0} disableGutters>
          <RecentActivityAccordionSummary
            title={activity.name}
            label={activity.status}
            prefix={'Maintenance Plan Item'}
          />
          <RecentActivityAccordionDetails index={index} activity={activity} prefix={'Maintenance Plan Item'}/>
        </Accordion>
      ))}
      {recentActivities.assets.map((activity, index) => (
        <Accordion key={index} elevation={0} disableGutters>
          <RecentActivityAccordionSummary
            title={activity?.name || ''}
            label={activity?.status || ''}
            prefix={'Asset'}
          />
          <RecentActivityAccordionDetails index={index} activity={activity} prefix={'Asset'}/>
        </Accordion>
      ))}
    </>
  );
};

export default RecentActivityAccordion;
