import { FormField, LocationType } from "@utils/types";

// Selected asset type is used for displaying items in
// selected cateogory or maintenance plans
export type SelectedAssetType = {
  id: string;
  name: string;
  description: string;
  color: string;
  image?: string;
  status: string;
  min_items_limit: number;
  max_items_limit: number;
  location?: LocationType;
  status_name?: string; // used for categories
  maintenance_status?: string; // used for maintenance plan
  maintenance_status_name?: string; // used for maintenance plan
  created_at: string;
  created_by: string;
  updated_at: string;
  updator: string;
  updated_by: string;
  sharable_groups: string[];
};

export type AddCategoryFormFields = {
  name: FormField;
  description: FormField;
};
