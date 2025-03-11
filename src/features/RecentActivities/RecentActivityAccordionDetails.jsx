import { AccordionDetails } from '@mui/material';
import RecentActivity from '@features/RecentActivities/RecentActivity/RecentActivity';

export default function RecentActivityAccordionDetails({ index, activity, prefix }) {
  return (
    <AccordionDetails>
      <RecentActivity key={index} index={index} activity={activity} prefix={prefix}/>
    </AccordionDetails>
  );
}
