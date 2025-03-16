import dayjs from 'dayjs';

import { Skeleton, Stack } from '@mui/material';
import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import OverviewCardWrapper from '@features/Home/OverviewCardWrapper';
import OverviewCardItem from '@features/Home/OverviewCardItem';
import OverviewContentSummary from '@features/Home/OverviewContentSummary';
import OverviewContentAssetBreakdown from '@features/Home/OverviewContentAssetBreakdown';
import OverviewContentAssetGraph from '@features/Home/OverviewContentAssetGraph';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { useFetchAssets } from '@services/assetsApi';
import {
  useFetchAssetsAssociatedWithMaintenancePlanByUserId,
  useFetchMaintenancePlans,
} from '@services/maintenancePlanApi';
import { useFetchAllCategories, useFetchAssetsAssociatedWithCategoriesByUserId } from '@services/categoriesApi';

export default function Overview() {
  const { user } = useAuthenticator();

  const { data: assets = [], isLoading: isAssetsListLoading } = useFetchAssets(user.userId);
  const { data: categories = [], isLoading: isCategoryListLoading } = useFetchAllCategories();
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
        <Stack data-tour="overview-1">
          <RowHeader title="Asset Summary" caption="View details about your assets." />
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            <OverviewCardWrapper>
              <OverviewCardItem
                label="assigned categories"
                icon={<CategoryRounded />}
                color="info.main"
                dataLabel={assetsUnderCategories.flatMap((v) => v.items).length}
              />
            </OverviewCardWrapper>
            <OverviewCardWrapper>
              <OverviewCardItem
                label="assigned maintenance plan"
                icon={<EngineeringRounded />}
                color="info.main"
                dataLabel={assetsUnderMaintenancePlan.flatMap((v) => v.items).length}
              />
            </OverviewCardWrapper>
            <OverviewCardWrapper>
              <OverviewCardItem
                label="past return deadline"
                icon={<WarningRounded />}
                color="error.main"
                dataLabel={assetsPastDue.length}
              />
            </OverviewCardWrapper>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <OverviewContentSummary assets={assets} />
          <OverviewContentAssetBreakdown assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
          <OverviewContentAssetGraph assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
        </Stack>
      </Stack>
    </Stack>
  );
}
