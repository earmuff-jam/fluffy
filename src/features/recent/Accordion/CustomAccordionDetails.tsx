import * as React from 'react';

import { AccordionDetails } from '@mui/material';
import RecentActivity from '@features/recent/RecentActivity';
import { RecentActivityType } from '@features/recent/types';

interface ICustomAccordionDetailsProps {
  index: number;
  activity: RecentActivityType;
}

const CustomAccordionDetails: React.FunctionComponent<ICustomAccordionDetailsProps> = ({ index, activity }) => {
  return (
    <AccordionDetails>
      <RecentActivity key={index} activity={activity} />
    </AccordionDetails>
  );
};

export default CustomAccordionDetails;
