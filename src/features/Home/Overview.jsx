import dayjs from 'dayjs';

import { Skeleton, Stack } from '@mui/material';

import RowHeader from '@common/RowHeader';
import OverviewHeader from '@features/Home/OverviewHeader/OverviewHeader';
import OverviewContent from '@features/Home/OverviewContent/OverviewContent';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { useFetchAssets } from '@services/assetsApi';
import { useFetchAllCategories, useFetchAssetsAssociatedWithCategoriesByUserId } from '@services/categoriesApi';
import {
  useFetchAssetsAssociatedWithMaintenancePlanByUserId,
  useFetchMaintenancePlans,
} from '@services/maintenancePlanApi';


export default function Overview() {
  const { user } = useAuthenticator();

  const { data: assets = [], isLoading: isAssetsListLoading } = useFetchAssets(user.userId);
  const { data: categories = [], isLoading: isCategoryListLoading } = useFetchAllCategories(user.userId);
  const { data: maintenancePlans = [], isLoading: isMaintenancePlanListLoading } = useFetchMaintenancePlans(
    user.userId
  );

  const { data: assetsUnderCategories = [], isLoading: assetsUnderCategoriesLoading } =
    useFetchAssetsAssociatedWithCategoriesByUserId(user.userId);

  const { data: assetsUnderMaintenancePlan = [], isLoading: assetsUnderMaintenancePlanLoading } =
    useFetchAssetsAssociatedWithMaintenancePlanByUserId(user.userId);

  const assetsPastDue = assets?.reduce((acc, el) => {
    if (dayjs(el.returnDatetime).isBefore(dayjs())) {
      acc.push(el.name);
    }
    return acc;
  }, []);

  if (
    [
      isAssetsListLoading,
      isCategoryListLoading,
      isMaintenancePlanListLoading,
      assetsUnderCategoriesLoading,
      assetsUnderMaintenancePlanLoading,
    ].some(Boolean)
  ) {
    return <Skeleton height="20vh" />;
  }

  return (
    <Stack data-tour="overview-0">
      <RowHeader title="Overview" caption="View a summarized report about your assets." />
      <Stack spacing={2}>
        <OverviewHeader
          assetsUnderCategories={assetsUnderCategories}
          assetsUnderMaintenancePlans={assetsUnderMaintenancePlan}
          assetsPastDue={assetsPastDue}
        />
        <OverviewContent assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
      </Stack>
    </Stack>
  );
}
