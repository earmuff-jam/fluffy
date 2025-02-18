import { AuditColumns } from '@utils/types';

// used for asset summary in the overview page
export type AssetSummaryType = AuditColumns & {
  id: string;
  name: string;
  type: string;
  returntime: string;
  price: number;
  items: number;
};
