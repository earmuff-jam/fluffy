import { FormField } from '@utils/types';

// AssetDetailsFormFieldType
//
// used to build out an individual asset in the
// form component
export type AssetDetailsFormFieldType = {
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
  createdAt: FormField;
  createdBy: FormField;
  updatedAt: FormField;
  updatedBy: FormField;
  collaborators: FormField;
};
