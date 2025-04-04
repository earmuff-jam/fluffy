import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * filter options are the selection menu for the reports page.
 */
export const FILTER_OPTIONS = [
  {
    id: 1,
    label: 'today',
    display: 'Today',
    value: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: 2,
    label: 'past 7 days',
    display: 'past 7 days',
    value: dayjs().subtract(7, 'days').toISOString(),
  },
  {
    id: 3,
    label: 'past 15 days',
    display: 'past 15 days',
    value: dayjs().subtract(15, 'days').toISOString(),
  },
  {
    id: 4,
    label: 'month',
    display: 'Current Month',
    value: dayjs().subtract(30, 'days').toISOString(),
  },
  {
    id: 5,
    label: 'past 6 months',
    display: 'past 6 months',
    value: dayjs().subtract(6, 'months').toISOString(),
  },
  {
    id: 6,
    label: 'current year',
    display: 'Current Year',
    value: dayjs().subtract(1, 'year').toISOString(),
  },
  {
    id: 7,
    label: 'ytd',
    display: 'YTD',
    value: dayjs().startOf('year').toISOString(),
  },
];
