import { LocationType } from "@features/notes/types";
import { FormField } from "@utils/types";

export type CategoryType = {
  id: string;
  name: string;
  description: string;
  color: string;
  image?: string;
  status: string;
  min_items_limit: number;
  max_items_limit: number;
  location?: LocationType;
  maintenance_status_name?: string;
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
}