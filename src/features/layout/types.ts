// MenuActionBarListType
//
// used to view list elements from the side
export type MenuActionBarListType = {
  id: number;
  icon: React.ReactElement;
  label: string;
  to: string;
};

// FavouriteItemType
//
// used to view favourite elements
export type FavouriteItem = {
  id: string;
  category_name?: string;
  category_id?: string;
  maintenance_plan_name?: string;
  maintenance_plan_id?: string;
};

// ToolbarPopoverContentOptions...
//
// used to build the popover content options
// for maintenance plan
export type ToolbarPopoverContentOptions = {
  id: string;
  name: string;
  is_read: boolean;
  plan_due: string;
};
