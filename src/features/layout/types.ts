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
