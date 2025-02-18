import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import AppLayout from '@features/layout/Layout'; // Can't be lazy-loaded
import SelectedAsset from '@features/assets/SelectedAsset';


const Overview = lazy(() => import('@features/overview/Overview'));
const Report = lazy(() => import('@features/report/Report'));
const NotesList = lazy(() => import('@features/notes/NotesList'));

const Profile = lazy(() => import('@features/profile/Profile'));
const CategoryList = lazy(() => import('@features/categories/CategoryList'));
const Assets = lazy(() => import('@features/assets/Assets'));
// const RecentActivityList = lazy(() => import('@features/recentActivities/RecentActivityList'));

// const SelectedAsset = lazy(() => import('@features/selected/SelectedAsset'));
// const MaintenancePlanList = lazy(() => import('@features/maintenancePlan/MaintenancePlanList'));
const CategoryItemDetails = lazy(() => import('@features/categories/CategoryItemDetails'));

// const MaintenancePlanItemDetails = lazy(
// () => import('@features/MaintenancePlanItemDetails/MaintenancePlanItemDetails')
// );

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Overview /> },
            { path: '/inventories/list', element: <Assets /> },
            { path: '/inventories/:id/update', element: <SelectedAsset /> },
            { path: '/categories/list', element: <CategoryList /> },
            { path: '/category/:id', element: <CategoryItemDetails /> },
            // { path: '/plans/list', element: <MaintenancePlanList /> },
            // { path: '/plan/:id', element: <MaintenancePlanItemDetails /> },
            { path: '/reports', element: <Report /> },
            { path: '/profile', element: <Profile /> },
            { path: '/profile/notes', element: <NotesList /> },
            // { path: '/recent/activities', element: <RecentActivityList /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
