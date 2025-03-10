import { Stack } from '@mui/material';

import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';

import RowHeader from '@common/RowHeader';
import OverviewCardItem from '@features/Home/OverviewCard/OverviewCardItem';
import OverviewCardWrapper from '@features/Home/OverviewCard/OverviewCardWrapper';

export default function OverviewHeader({
  assetsUnderCategories = [],
  assetsUnderMaintenancePlans = [],
  assetsPastDue = [],
}) {
  return (
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
            dataLabel={assetsUnderMaintenancePlans.flatMap((v) => v.items).length}
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
  );
}
