import { Dayjs } from 'dayjs';

import { AuditColumns, AuditColumnsFormField, FormField } from '@utils/types';

// AssetDetailsFormFieldType
//
// used to build out an individual asset in the
// form component
export type AssetDetailsFormFieldType = AuditColumnsFormField & {
  name: FormField;
  description: FormField;
  price: FormField;
  barcode: FormField;
  sku: FormField;
  quantity: FormField;
  boughtAt: FormField;
  location: FormField;
  isBookmarked: FormField;
  isReturnable: FormField;
  returnLocation: FormField;
  maxWeight: FormField;
  minWeight: FormField;
  maxHeight: FormField;
  minHeight: FormField;
  returnNotes: FormField;
};

// AssetListColumnHeader obj
export type AssetListColumnHeader = {
  id: number;
  colName: string;
  label: string;
  displayConcise: boolean;
  modifier: (value: any) => React.ReactElement | string;
};

// AssetType
//
// AssetType is the primitive object.
// AssetTypeReadOnly should be used when form fields is not in usage.
// AssetTypeFormFields should be used for editing purposes.
export type AssetType<TAudit = AuditColumns> = TAudit & {
  id: string;
  name: string;
  title: string;
  description: string;
  barcode: string;
  sku: string;
  boughtAt: string;
  maxWeight: number;
  minWeight: number;
  maxHeight: number;
  minHeight: number;
  price: number;
  location: string;
  quantity: number;
  isBookmarked: boolean;
  isReturnable: boolean;
  returnLocation: string;
  color: string;
  returnNotes: string;
  returnDatetime: Dayjs;
};

export type AssetTypeReadOnly = AssetType<AuditColumns>;
export type AssetTypeFormFields = AssetType<AuditColumnsFormField>;
