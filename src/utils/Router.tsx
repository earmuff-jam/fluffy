import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import AppLayout from '@features/layout/Layout'; // Can't be lazy-loaded

const Assets = lazy(() => import('@features/assets/Assets'));
const Profile = lazy(() => import('@features/profile/Profile'));
const SelectedAsset = lazy(() => import('@features/assets/SelectedAsset'));
const RecentActivities = lazy(() => import('@features/recent/RecentActivities'));
const Plan = lazy(() => import('@features/maintenance/plan'));
const NotesList = lazy(() => import('@features/notes/NotesList'));
const CategoryItemDetails = lazy(() => import('@features/categories/CategoryItemDetails'));
const Overview = lazy(() => import('@features/overview/Overview'));
const Report = lazy(() => import('@features/report/Report'));
const CategoryList = lazy(() => import('@features/categories/CategoryList'));
const PlanDetails = lazy(() => import('@features/maintenance/PlanDetails'));

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
      { path: '/plans/list', element: <Plan /> },
      { path: '/category/:id', element: <CategoryItemDetails /> },
      { path: '/plan/:id', element: <PlanDetails /> },
      { path: '/inventories/:id/update', element: <SelectedAsset /> },
      { path: '/recent/activities', element: <RecentActivities /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
