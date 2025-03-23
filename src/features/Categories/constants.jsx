const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
  size: 'small',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
  size: 'small',
};

/**
 * ADD_CATEGORY_FORM_FIELDS ...
 *
 * Add Category Form Fields are used to build out the
 * form required to add new category into the system.
 */
export const ADD_CATEGORY_FORM_FIELDS = {
  name: {
    name: 'name',
    label: 'Category Title',
    placeholder: 'Short category title',
    value: '',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Category name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Category name should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Category description in less than 500 characters',
    value: '',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Description should be less than 500 characters',
      },
    ],
    ...GENERIC_TEXTAREA_VARIANT,
  },
};

/**
 * CATEGORY_COLUMN_HEADERS ...
 *
 * Category Column Headers are used to build out the headers for the
 * column for categories to download list of categories. Collaborators can also
 * download associated category plans.
 */
export const CATEGORY_COLUMN_HEADERS = {
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
