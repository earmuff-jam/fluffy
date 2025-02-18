import * as React from 'react';

import { AccordionSummary, Stack, Typography } from '@mui/material';

import { ExpandMoreRounded } from '@mui/icons-material';
import { capitalizeFirstLetter } from '@utils/utility';

interface ICustomAccordionSummaryProps {
  title: string;
  label: string;
  prefix: string;
}

const CustomAccordionSummary: React.FunctionComponent<ICustomAccordionSummaryProps> = ({ title, label, prefix }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMoreRounded />}>
      <Stack>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{`${capitalizeFirstLetter(label)} ${prefix}`}</Typography>
      </Stack>
    </AccordionSummary>
  );
};

export default CustomAccordionSummary;
