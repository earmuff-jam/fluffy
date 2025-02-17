import { AuditColumns, FormField, LocationType } from '@utils/types';

// AddCategoryFormFields
//
// used to build out add category form fields
export type AddCategoryFormFields = {
  name: FormField;
  description: FormField;
};

// Category Type
//
// Category type coupled with Audit Columns
// used to build out a single category
export type CategoryType = AuditColumns & {
  id: string;
  name: string;
  description: string;
  color: string;
  location: LocationType;
  status: string;
};
