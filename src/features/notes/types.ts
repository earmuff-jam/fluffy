import { FormField, LocationType } from "@utils/types";

export type AddNoteFormFields = {
  title: FormField;
  description: FormField;
};

export type NoteType = {
  noteID: string;
  title: string;
  description: string;
  status: string;
  status_name: string;
  status_description: string;
  color: string;
  location: LocationType;
  completionDate?: string;
  created_at: string;
  created_by: string;
  creator?: string;
  updated_at: string;
  updated_by: string;
  updator?: string;
  sharable_groups: Array<string>;
};
