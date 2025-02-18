import * as React from 'react';
import { Stack } from '@mui/material';

import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
  Timeline,
} from '@mui/lab';

interface ICustomTimelineProps {
  color: string;
  icon: React.ReactElement;
  label: string;
  secondaryLabel: string;
}

const CustomTimeline: React.FunctionComponent<ICustomTimelineProps> = ({
  color = '',
  icon,
  label = '',
  secondaryLabel = '',
}) => {
  return (
    <Timeline sx={{ padding: 0, margin: 0 }}>
      <TimelineItem sx={{ alignItems: 'center' }}>
        <TimelineOppositeContent display="none" />
        <TimelineSeparator>
          <TimelineDot color={color}>{icon}</TimelineDot>
        </TimelineSeparator>
        <Stack>
          <TimelineContent variant="caption">{label}</TimelineContent>
          <TimelineContent variant="caption">{secondaryLabel}</TimelineContent>
        </Stack>
      </TimelineItem>
    </Timeline>
  );
};

export default CustomTimeline;
