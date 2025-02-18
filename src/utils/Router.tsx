import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import AppLayout from '@features/layout/Layout'; // Can't be lazy-loaded

const Assets = lazy(() => import('@features/assets/Assets'));
const Report = lazy(() => import('@features/report/Report'));
const Profile = lazy(() => import('@features/profile/Profile'));
const NotesList = lazy(() => import('@features/notes/NotesList'));
const Overview = lazy(() => import('@features/overview/Overview'));
const SelectedAsset = lazy(() => import('@features/assets/SelectedAsset'));
const CategoryList = lazy(() => import('@features/categories/CategoryList'));
const CategoryItemDetails = lazy(() => import('@features/categories/CategoryItemDetails'));
const RecentActivityList = lazy(() => import('@features/recentActivities/RecentActivityList'));
const MaintenancePlanList = lazy(() => import('@features/maintenancePlan/MaintenancePlanList'));
const MaintenancePlanItemDetails = lazy(
  () => import('@features/MaintenancePlanItemDetails/MaintenancePlanItemDetails')
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Overview /> },
      { path: '/reports', element: <Report /> },
      { path: '/profile', element: <Profile /> },
      { path: '/inventories/list', element: <Assets /> },
      { path: '/profile/notes', element: <NotesList /> },
      { path: '/categories/list', element: <CategoryList /> },
      { path: '/plans/list', element: <MaintenancePlanList /> },
      { path: '/category/:id', element: <CategoryItemDetails /> },
      { path: '/plan/:id', element: <MaintenancePlanItemDetails /> },
      { path: '/inventories/:id/update', element: <SelectedAsset /> },
      { path: '/recent/activities', element: <RecentActivityList /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
