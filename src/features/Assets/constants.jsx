import dayjs from 'dayjs';

import QrCodeGen from '@utils/QrCodeGen';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CheckRounded, CloseRounded } from '@mui/icons-material';
import { capitalizeFirstLetter } from '@utils/utils';
import { Box } from '@mui/material';

dayjs.extend(relativeTime);

/**
 * Modal State is the display state of modal between adding a single inventory, adding a bulk
 * inventory and removing inventories
 *
 */
export const MODAL_STATE = {
  NONE: 'none',
  ADD_ITEM: 'item',
  BULK_ITEM: 'bulk',
  MORE_DETAILS: 'more',
  ASSIGN_CATEGORY: 'assign_category',
  ASSIGN_MAINTENANCE_PLAN: 'assign_maintenance_plan',
};

/**
 * Bulk Asset Headers for template download.
 */
export const BULK_ASSETS_HEADERS = [
  { label: 'Name', colValue: 'name' },
  { label: 'Description', colValue: 'description' },
  { label: 'Price', colValue: 'price' },
  { label: 'Quantity', colValue: 'quantity' },
  { label: 'Storage Location', colValue: 'storageLocation' },
  { label: 'Color', colValue: 'color' },
  { label: 'SKU', colValue: 'sku' },
  { label: 'Barcode', colValue: 'barcode' },
  { label: 'Purchase Location', colValue: 'boughtAt' },
  { label: 'Minimum Height', colValue: 'minHeight' },
  { label: 'Maximum Height', colValue: 'maxHeight' },
  { label: 'Minimum Weight', colValue: 'minWeight' },
  { label: 'Maximum Weight', colValue: 'maxWeight' },
];

/**
 * default inventories landing page items to encourage users to use
 * various features of the application
 */
export const DEFAULT_INVENTORIES_LANDING_PAGE_TEXT = [
  {
    name: 'Create and view maintenance request',
    description: 'Create periodic maintenance of inventory items',
    imageSrc: 'images/books.jpg',
    imageAlt: 'default-maintenance-inventory-items-img',
    href: '/inventories/maintenance/list',
  },
  {
    name: 'Track record of inventories',
    description: 'Visualize items which are due for maintenance or need attention',
    imageSrc: 'images/items.jpg',
    imageAlt: 'default-track-record-inventory-items-img',
    href: 'inventories/forecast/list',
  },
  {
    name: 'Categories inventories and stay in sync',
    description: 'Understand your inventories better. Keep tabs on more important inventories',
    imageSrc: 'images/kitchen-items.jpg',
    imageAlt: 'default-bookmarked-inventory-items-img',
    href: '/inventories/categories/list',
  },
];

/**
 * combines the configs based on the selectedRow parameter. Returns a
 * list of tableRows derieved from the selectedRow object. If modifier function is passed
 * in, we build the table in accordance to it as well.
 *
 * @param {Object} selectedRow - the current selected row to build the table for
 * @returns {Array} tableRows - the combined row with modifiers applied if passed in.
 */
export const BUILD_TABLE_CONSTANTS = (columnLabels) => (selectedRow) => {
  if (!selectedRow) {
    return [];
  }
  const tableRows = columnLabels.map(({ id, colName, label, modifier }) => {
    let value = selectedRow[colName];
    if (modifier) {
      if (colName === 'qrCode') {
        value = modifier(selectedRow['name']);
      } else {
        value = modifier(value, { colName, label });
      }
    }

    return {
      id,
      colName,
      label,
      value,
    };
  });

  return tableRows;
};

/**
 * ASSETS_LIST_HEADERS ...
 * 
 * List of assets headers for the MRTv2 table.
 */
export const ASSETS_LIST_HEADERS = [
  {
    name: 'name',
    header: 'NAME',
    accessorKey: 'name',
    size: 200,
    Cell: ({ cell }) => {
      const assetName = cell.getValue();
      return capitalizeFirstLetter(assetName);
    },
  },
  {
    name: 'description',
    header: 'DESCRIPTION',
    accessorKey: 'description',
    size: 300,
    Cell: ({ cell }) => {
      const assetDescription = cell.getValue();
      return assetDescription?.length > 0 ? capitalizeFirstLetter(assetDescription) : '-';
    },
  },
  {
    name: 'price',
    header: 'PRICE',
    accessorKey: 'price',
    size: 150,
    Cell: ({ cell }) => {
      return (
        <Box
          component="span"
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() < 1000
                ? theme.palette.success.light
                : cell.getValue() >= 1000 && cell.getValue() < 10000
                  ? theme.palette.warning.light
                  : theme.palette.info.light,
            borderRadius: '0.25rem',
            color: '#fff',
            maxWidth: '9ch',
            p: '0.25rem',
          })}
        >
          {cell.getValue()?.length > 0 ? cell.getValue() : '-'}
        </Box>
      );
    },
  },
  {
    name: 'color',
    header: 'COLOR',
    accessorKey: 'color',
    size: 150,
  },
  {
    name: 'quantity',
    header: 'QUANTITY',
    accessorKey: 'quantity',
    size: 150,
  },
  {
    name: 'storageLocation',
    header: 'STORAGE LOCATION',
    accessorKey: 'storageLocationId.location',
    size: 200,
    Cell: ({ cell }) => {
      const storageLocation = cell.getValue();
      return storageLocation?.length > 0 ? capitalizeFirstLetter(storageLocation) : '-';
    },
  },
  {
    name: 'updatedAt',
    header: 'UPDATED AT',
    accessorKey: 'updatedAt',
    size: 150,
    Cell: ({ cell }) => {
      const updatedAt = cell.getValue();
      return dayjs(updatedAt).fromNow();
    },
  },
  {
    name: 'updatedBy',
    header: 'LAST UPDATED BY',
    accessorKey: 'updatedBy',
    size: 150,
    Cell: ({ cell }) => {
      const updatedBy = cell?.getValue();
      console.log(updatedBy);
      return updatedBy?.emailAddress.length > 0 ? updatedBy?.emailAddress : '-';
    },
  },
];

/**
 * ASSETS_LIST_DRAWER_HEADERS
 *
 * Asset list headers used for table columns and to build details for drawer
 * component. modifier fn can take value, { column, label } to display variations.
 *
 */
export const ASSETS_LIST_DRAWER_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'NAME',
    displayConcise: true,
    modifier: (value) => `${value || '-'}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'DESCRIPTION',
    displayName: 'Description',
    displayConcise: false,
    modifier: (value) => `${value || '-'}`,
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'COST',
    displayConcise: true,
    modifier: (value) => `${+value || '-'}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'BARCODE',
    modifier: (value) => `${value || '-'}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (value) => `${value || '-'}`,
  },
  color: {
    id: 7,
    colName: 'color',
    label: 'ASSET COLOR',
    modifier: (value) => `${value || '-'}`,
  },
  quantity: {
    id: 8,
    colName: 'quantity',
    label: 'QUANTITY',
    displayConcise: true,
    modifier: (value) => `${+value || '-'}`,
  },
  location: {
    id: 9,
    colName: 'storageLocationId',
    label: 'STORAGE LOCATION',
    displayConcise: true,
    modifier: (value) => `${value?.location || '-'}`,
  },
  isReturnable: {
    id: 10,
    colName: 'isReturnable',
    label: 'RETURNABLE',
    modifier: (value) => (value ? <CheckRounded color="primary" /> : <CloseRounded color="warning" />),
  },
  returnLocation: {
    id: 11,
    colName: 'returnLocation',
    label: 'RETURN LOCATION',
    modifier: (value) => `${value || '-'}`,
  },
  maxWeight: {
    id: 12,
    colName: 'maxWeight',
    label: 'MAXIMUM WEIGHT',
    modifier: (value) => `${value || '-'}`,
  },
  minWeight: {
    id: 13,
    colName: 'minWeight',
    label: 'MINIMUM WEIGHT',
    modifier: (value) => `${value || '-'}`,
  },
  maxHeight: {
    id: 14,
    colName: 'maxHeight',
    label: 'MAXIMUM HEIGHT',
    modifier: (value) => `${value || '-'}`,
  },
  minHeight: {
    id: 15,
    colName: 'minHeight',
    label: 'MINIMUM HEIGHT',
    modifier: (value) => `${value || '-'}`,
  },
  boughtAt: {
    id: 16,
    colName: 'boughtAt',
    label: 'PURCHASE LOCATION',
    modifier: (value) => `${value || '-'}`,
  },
  qrCode: {
    id: 17,
    colName: 'qrCode',
    label: 'QR CODE',
    modifier: (value) => <QrCodeGen value={value} />,
  },
  updatedAt: {
    id: 18,
    colName: 'updatedAt',
    label: 'UPDATED AT',
    displayConcise: true,
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  updator: {
    id: 19,
    colName: 'updatedBy',
    label: 'UPDATED BY',
    displayConcise: true,
    modifier: (value) => `${value?.emailAddress || '-'}`,
  },
};

/**
 * BLANK_ASSET_DETAILS_FORM ...
 *
 * Blank Asset details form
 */
export const BLANK_ASSET_DETAILS_FORM = {
  name: {
    id: 'name',
    label: 'Asset name',
    name: 'name',
    size: 'small',
    placeholder: 'Asset name',
    value: '',
    type: 'text',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item name is required',
      },
      {
        validate: (value) => value.trim().length >= 200,
        message: 'Item name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    label: 'Asset description',
    value: '',
    name: 'description',
    placeholder: 'Asset description in less than 500 characters',
    type: 'text',
    size: 'small',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Item description should be less than 50 characters',
      },
    ],
  },
  price: {
    id: 'price',
    label: 'Asset price (per unit)',
    value: '',
    name: 'price',
    size: 'small',
    placeholder: 'Asset price per unit',
    type: 'number',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  barcode: {
    id: 'barcode',
    name: 'barcode',
    label: 'Barcode',
    value: '',
    type: 'text',
    size: 'small',
    placeholder: 'Barcode of the selected asset',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    id: 'sku',
    name: 'sku',
    label: 'SKU',
    value: '',
    type: 'text',
    size: 'small',
    placeholder: 'SKU of the selected asset',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of item should be less than 50 characters',
      },
    ],
  },
  quantity: {
    id: 'quantity',
    name: 'quantity',
    label: 'Asset quantity',
    value: '',
    type: 'number',
    placeholder: 'The quantity of the asset',
    size: 'small',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  boughtAt: {
    id: 'boughtAt',
    name: 'boughtAt',
    label: 'Place of purchase',
    placeholder: 'Where did you buy this item?',
    value: '',
    type: 'text',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  location: {
    id: 'location',
    label: 'Storage location',
    placeholder: 'Where do you want to store the item',
    type: 'text',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  isBookmarked: {
    id: 'isBookmarked',
    value: false,
    type: 'boolean',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  isReturnable: {
    id: 'isReturnable',
    value: false,
    type: 'boolean',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  returnLocation: {
    id: 'returnLocation',
    name: 'returnLocation',
    label: 'Return location',
    placeholder: 'Where to return the item',
    value: '',
    type: 'text',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  maxWeight: {
    id: 'maxWeight',
    name: 'maxWeight',
    label: 'Maxmimum weight',
    placeholder: 'Maximum weight of the selected asset in kg',
    value: '',
    type: 'number',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  minWeight: {
    id: 'minWeight',
    name: 'minWeight',
    label: 'Minimum Weight',
    placeholder: 'Minimum weight of the selected asset in kg',
    value: '',
    type: 'number',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  maxHeight: {
    id: 'maxHeight',
    name: 'maxHeight',
    label: 'Maximum height',
    placeholder: 'Maximum height of selected asset in inches',
    value: '',
    type: 'number',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  minHeight: {
    id: 'minHeight',
    name: 'minHeight',
    label: 'Minimum height',
    placeholder: 'Minimum height of selected asset in inches',
    value: '',
    type: 'number',
    size: 'small',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
      {
        validate: (value) => parseInt(value) > Number.MAX_SAFE_INTEGER,
        message: 'Value cannot exceed limit',
      },
    ],
  },
  returnNotes: {
    id: 'returnNotes',
    name: 'returnNotes',
    label: 'Return notes',
    placeholder: 'Add return notes in less than 500 characters',
    value: '',
    type: 'text',
    isRequired: false,
    size: 'small',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Return notes should be less than 500 characters',
      },
    ],
  },
  createdAt: {
    id: 'createdAt',
    errorMsg: '',
    validators: [],
  },
  createdBy: {
    id: 'createdBy',
    errorMsg: '',
    validators: [],
  },
  updatedAt: {
    id: 'updatedAt',
    errorMsg: '',
    validators: [],
  },
  updatedBy: {
    id: 'updatedBy',
    errorMsg: '',
    validators: [],
  },
  sharable_groups: {
    id: 'sharable_groups',
    errorMsg: '',
    validators: [],
  },
};
