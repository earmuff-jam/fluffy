import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { capitalizeFirstLetter } from '@common/utils';

dayjs.extend(relativeTime);

export const ASSETS_IN_REPORTS_HEADER = [
  {
    name: 'name',
    header: 'Asset Name',
    accessorKey: 'name',
    size: 200,
    Cell: ({ cell }) => {
      const assetName = cell.getValue();
      return capitalizeFirstLetter(assetName);
    },
  },
  {
    name: 'description',
    header: 'Description',
    accessorKey: 'description',
    size: 500,
    Cell: ({ cell }) => {
      const assetDescription = cell.getValue();
      return assetDescription?.length > 0 ? capitalizeFirstLetter(assetDescription) : '-';
    },
  },
  {
    name: 'price',
    header: 'Price',
    accessorKey: 'price',
    size: 150,
    Cell: ({ cell }) => {
      return <>{cell.getValue()?.length > 0 ? cell.getValue() : '-'}</>;
    },
  },
  {
    name: 'quantity',
    header: 'Quantity',
    accessorKey: 'quantity',
    size: 150,
  },
  {
    name: 'storageLocation',
    header: 'Storage Location',
    accessorKey: 'storageLocationId.location',
    size: 200,
    Cell: ({ cell }) => {
      const storageLocation = cell.getValue();
      return storageLocation?.length > 0 ? capitalizeFirstLetter(storageLocation) : '-';
    },
  },
  {
    name: 'updator',
    header: 'Last updated by',
    accessorKey: 'updatedBy',
    size: 150,
    Cell: ({ cell }) => {
      const updatedBy = cell.getValue();
      return updatedBy?.emailAddress.length > 0 ? updatedBy?.emailAddress : '-';
    },
  },
];

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
