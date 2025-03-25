import dayjs from 'dayjs';

export const ITEM_TYPE_MAPPER = {
  daily: {
    display: 'Daily',
    value: 'daily',
    since: dayjs().add(1, 'day').toISOString(),
  },
  weekly: {
    display: 'Weekly',
    value: 'weekly',
    since: dayjs().add(7, 'days').toISOString(),
  },
  biweekly: {
    display: 'Bi-Weekly',
    value: 'biweekly',
    since: dayjs().add(15, 'days').toISOString(),
  },
  monthly: {
    display: 'Monthly',
    value: 'monthly',
    since: dayjs().add(30, 'days').toISOString(),
  },
  quaterly: {
    display: 'Quaterly',
    value: 'quaterly',
    since: dayjs().add(3, 'months').toISOString(),
  },
  semiannually: {
    display: 'Semi-annually',
    value: 'semiannually',
    since: dayjs().add(6, 'months').toISOString(),
  },
  annual: {
    display: 'Annually',
    value: 'annual',
    since: dayjs().add(1, 'year').toISOString(),
  },
};

/**
 * MAINTENANCE_PLAN_COLUMN_HEADERS ...
 *
 * Maintenance Plan Column Headers are used to build out the headers for the
 * column for maintenance plans to download list of maintenance plans. Collaborators can also
 * download associated maintenance plans.
 */
export const MAINTENANCE_PLAN_COLUMN_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'NAME',
    modifier: (value) => `${value || '-'}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'DESCRIPTION',
    displayName: 'Description',
    modifier: (value) => `${value || '-'}`,
  },
  color: {
    id: 2,
    colName: 'color',
    label: 'COLOR',
    displayName: 'Color',
    modifier: (value) => `${value || '-'}`,
  },
  status: {
    id: 2,
    colName: 'status',
    label: 'Status',
    displayName: 'Status',
    modifier: (value) => `${value || '-'}`,
  },
  location: {
    id: 2,
    colName: 'location',
    label: 'Location',
    displayName: 'Location',
    modifier: (value) => (value?.lat !== undefined && value?.lon !== undefined ? `${value.lat}, ${value.lon}` : '-'),
  },
  updator: {
    id: 19,
    colName: 'updatedBy',
    label: 'UPDATED BY',
    displayConcise: true,
    modifier: (value) => `${value?.emailAddress || '-'}`,
  },
};

export const ADD_MAINTENANCE_PLAN_FORM_FIELDS = {
  name: {
    id: 'name',
    name: 'name',
    label: 'Title',
    value: '',
    placeholder: 'Add a title to your maintenance plan',
    required: true,
    fullWidth: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Title is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Title should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    name: 'description',
    label: 'Description',
    value: '',
    placeholder: 'Add a short descrption to your maintenance plan in less than 100 characters.',
    required: true,
    size: 'small',
    fullWidth: true,
    rows: 4,
    multiline: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Plan description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Plan description should be less than 500 characters',
      },
    ],
  },
};
