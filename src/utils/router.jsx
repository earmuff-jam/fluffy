import { lazy } from 'react';

const Overview = lazy(() => import('@features/Home/Overview'));
const Reports = lazy(() => import('@features/Reports/Reports'));
const NotesList = lazy(() => import('@features/Notes/NotesList'));

const AssetList = lazy(() => import('@features/Assets/AssetList'));
const ProfilePage = lazy(() => import('@features/Profile/ProfilePage'));
const CategoryList = lazy(() => import('@features/Categories/CategoryList'));
const RecentActivityList = lazy(() => import('@features/RecentActivities/RecentActivityList'));

const SelectedAsset = lazy(() => import('@features/SelectedAsset/SelectedAsset'));
const MaintenancePlanList = lazy(() => import('@features/MaintenancePlan/MaintenancePlanList'));
const CategoryItemDetails = lazy(() => import('@features/CategoryItemDetails/CategoryItemDetails'));
const MaintenancePlanItemDetails = lazy(
  () => import('@features/MaintenancePlanItemDetails/MaintenancePlanItemDetails')
);

export const AssetRoutes = [
  {
    path: 'overview',
    element: <Overview />,
  },
  {
    path: 'list',
    element: <AssetList />,
  },
  {
    path: ':id/update',
    element: <SelectedAsset />,
  },
  {
    path: 'categories',
    element: <CategoryList />,
  },
  {
    path: 'category/:id',
    element: <CategoryItemDetails />,
  },
  {
    path: 'plans',
    element: <MaintenancePlanList />,
  },
  {
    path: 'plan/:id',
    element: <MaintenancePlanItemDetails />,
  },
  {
    path: 'reports',
    element: <Reports />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'notes',
    element: <NotesList />,
  },
  {
    path: 'recent',
    element: <RecentActivityList />,
  },
];