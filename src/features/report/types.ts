import { AuditColumns } from '@utils/types';

// used to view filter options dropdown
export type FilterOptionsType = {
  id: number;
  label: string;
  display: string;
  value: string;
};

// used to build the report assets table header
export type ReportAssetsTableHeader = {
  name: string;
  header: string;
  accessorKey: string;
  size: number;
  Cell?: any; // MRT table v2 Cell object is any
};

// used to build the report type
export type ReportType = AuditColumns & {
  id: string;
  selected_time_range: string;
  total_valuation: number;
  cost_category_items: number;
};
