import {
  Inventory2Rounded,
  HomeRounded,
  CategoryRounded,
  SummarizeRounded,
  ReportSharp,
  Person2Rounded,
  BookmarkRounded,
} from '@mui/icons-material';

/**
 * Navigation menu list
 *
 * used to navigate through various pages
 */
export const NAVIGATION_MENU_LIST = [
  {
    id: 1,
    icon: <HomeRounded fontSize="small" />,
    label: 'Home',
    to: 'overview',
  },
  {
    id: 2,
    icon: <Inventory2Rounded fontSize="small" />,
    label: 'Assets',
    to: 'list',
  },
  {
    id: 3,
    icon: <CategoryRounded fontSize="small" />,
    label: 'Categories',
    to: 'categories',
  },
  {
    id: 4,
    icon: <SummarizeRounded fontSize="small" />,
    label: 'Maintenance plans',
    to: 'plans',
  },
  {
    id: 5,
    icon: <ReportSharp fontSize="small" />,
    label: 'Reports',
    to: 'reports',
  },
  {
    id: 6,
    icon: <Person2Rounded fontSize="small" />,
    label: 'Profile',
    to: 'profile',
  },
];

/**
 * Pinned inset menu list
 *
 * used to navigate to the default inset menu item
 */
export const PINNED_DEFAULT_INSET_MENU_LIST = [
  {
    id: 1,
    icon: <BookmarkRounded fontSize="small" color="warning" />,
    label: 'Recent Activities',
    to: 'recent',
  },
  {
    id: 2,
    icon: <BookmarkRounded fontSize="small" color="warning" />,
    label: 'Notes',
    to: 'notes',
  },
];
