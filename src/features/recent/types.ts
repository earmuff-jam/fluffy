import { AuditColumns } from "@utils/types";

// recent activity type
export type RecentActivityType = AuditColumns & {
  id: string;
  activity_id: string;
  type: string;
  title: string;
  custom_action: string;
};
