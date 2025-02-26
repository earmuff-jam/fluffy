import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AllInboxRounded, DraftsRounded, LoyaltyRounded, VisibilityOffRounded } from '@mui/icons-material';

dayjs.extend(relativeTime);

export const ADD_NEW_INVENTORY_SUBTITLE_TEXT =
  'Add items for your own inventory. Store items under here that are for your personal use. All Items stored with due process until the user profile is abandoned.';

export const ADD_ASSET_STEPS = ['Add inventory', 'Add more details', 'Publish inventory'];

export const INVENTORY_TABS = [
  {
    id: 1,
    icon: <AllInboxRounded />,
    tootipTitle: 'Displays inventory items',
    label: 'All products',
  },
  {
    id: 2,
    icon: <LoyaltyRounded />,
    tootipTitle: 'Displays inventory items that were labelled as bought in sale',
    label: 'Coupons / Deals',
  },
  {
    id: 3,
    icon: <DraftsRounded />,
    tootipTitle: 'Displays all inventory items labelled as draft',
    label: 'Draft',
  },
  {
    id: 4,
    icon: <VisibilityOffRounded />,
    tootipTitle: 'Displays all inventory items with hidden status',
    label: 'Hidden status',
  },
];

export const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

/**
 * ADD ITEM FORM.
 *
 * Used to add new asset.
 */
export const ADD_ASSET_FORM = {
  name: {
    id: 'name',
    label: 'Asset name',
    value: '',
    placeholder: 'The name of the asset',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Asset name is required',
      },
      {
        validate: (value) => value.trim().length >= 200,
        message: 'Asset name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    label: 'Asset description',
    placeholder: 'The detailed description of the asset',
    value: '',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Asset description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Asset description should be less than 50 characters',
      },
    ],
  },
  price: {
    id: 'price',
    label: 'Asset price (per unit)',
    placeholder: 'The per unit cost of the asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected Asset is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  barcode: {
    id: 'barcode',
    label: 'Barcode of item',
    placeholder: 'The unique identifier for the item',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Asset barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    id: 'sku',
    label: 'Sku of asset',
    placeholder: 'The SKU of the selected asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of Asset should be less than 50 characters',
      },
    ],
  },
  quantity: {
    id: 'quantity',
    label: 'Asset quantity',
    value: '',
    placeholder: 'Asset quantity',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected Asset is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  boughtAt: {
    id: 'boughtAt',
    label: 'Where did you buy the item',
    placeholder: 'The purchase location of the asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  location: {
    id: 'location',
    label: 'Where do you want to store the item',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  isBookmarked: {
    id: 'isBookmarked',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  isReturnable: {
    id: 'isReturnable',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  returnLocation: {
    id: 'returnLocation',
    label: 'Where to return the item',
    placeholder: 'The return location of the item',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  returnDatetime: {
    id: 'returnDatetime',
    value: '',
    type: 'datetime',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value < new Date().toISOString(),
        message: 'Return datetime cannot be an eariler date or time',
      },
    ],
  },
  maxWeight: {
    id: 'maxWeight',
    label: 'Max weight in kg',
    placeholder: 'The maximum weight of the asset in kg',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  minWeight: {
    id: 'minWeight',
    label: 'Min weight in kg',
    placeholder: 'The minimum weight of asset in kg',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  maxHeight: {
    id: 'maxHeight',
    label: 'Max height in inches',
    placeholder: 'The maximum height of asset in inches',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  minHeight: {
    id: 'minHeight',
    label: 'Min height in inches',
    placeholder: 'The minimum height of the asset in inches',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
};

export const VIEW_PERSONAL_INVENTORY_LIST_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'Asset name',
    modifier: (title) => `${title}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Asset Description',
    displayName: 'Description',
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'Cost',
    modifier: (title) => `${title}`,
  },
  status: {
    id: 4,
    colName: 'status',
    label: 'Status',
    modifier: (title) => `${title}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'Barcode',
    modifier: (title) => `${title}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (title) => `${title}`,
  },
  quantity: {
    id: 7,
    colName: 'quantity',
    label: 'Quantity',
    modifier: (title) => `${title}`,
  },
  location: {
    id: 8,
    colName: 'location',
    label: 'Storage location',
    modifier: (title) => `${title}`,
  },
  isReturnable: {
    id: 9,
    colName: 'isReturnable',
    label: 'Returnable',
    modifier: (title) => `${title}`,
  },
  returnLocation: {
    id: 10,
    colName: 'returnLocation',
    label: 'Return Location',
    modifier: (title) => `${title}`,
  },
  maxWeight: {
    id: 11,
    colName: 'maxWeight',
    label: 'Max Weight',
    modifier: (title) => `${title}`,
  },
  minWeight: {
    id: 12,
    colName: 'minWeight',
    label: 'Min Weight',
    modifier: (title) => `${title}`,
  },
  maxHeight: {
    id: 13,
    colName: 'maxHeight',
    label: 'Max Height',
    modifier: (title) => `${title}`,
  },
  minHeight: {
    id: 14,
    colName: 'minHeight',
    label: 'Min Height',
    modifier: (title) => `${title}`,
  },
  updatedAt: {
    id: 15,
    colName: 'updatedAt',
    label: 'Updated At',
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  createdAt: {
    id: 16,
    colName: 'createdAt',
    label: 'Created At',
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  updator: {
    id: 17,
    colName: 'updator',
    label: 'Updated By',
    modifier: (title) => `${title}`,
  },
  boughtAt: {
    id: 18,
    colName: 'boughtAt',
    label: 'Purchase Location',
    modifier: (title) => `${title}`,
  },
};
