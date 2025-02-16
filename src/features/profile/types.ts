export type ProfileStatsType = {
  totalCategories: number;
  totalMaintenancePlans: number;
  totalAssets: number;
};

export type UserDemographicsType = {
  id: string;
  username: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  about_me: string;
  online_status: boolean;
  is_dark_theme: boolean;
  appearance?: boolean;
  is_inventory_layout: boolean;
  created_at?: string;
  updated_at?: string;
};
