import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import OverviewCardItem from '@features/Home/OverviewCardItem';
import OverviewCardWrapper from '@features/Home/OverviewCardWrapper';

export default function OverviewContentAssetBreakdown({ assets = [], categories = [], maintenancePlans = [] }) {
  const navigate = useNavigate();
  const handleClick = (to) => navigate(to);

  return (
    <Stack data-tour="overview-3">
      <RowHeader title="Asset Breakdown" caption="View details about your categories and plans." />
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <OverviewCardWrapper>
          <OverviewCardItem
            label="as categories"
            icon={<CategoryRounded />}
            color="info.main"
            dataLabel={categories.length || 0}
            word="item"
            handleClick={() => handleClick('/assets/categories')}
          />
        </OverviewCardWrapper>
        <OverviewCardWrapper>
          <OverviewCardItem
            label="as maintenance plans"
            icon={<EngineeringRounded />}
            color="info.main"
            dataLabel={maintenancePlans.length || 0}
            word="item"
            handleClick={() => handleClick('/assets/plans')}
          />
        </OverviewCardWrapper>
        <OverviewCardWrapper>
          <OverviewCardItem
            label="are registered"
            icon={<WarningRounded />}
            color="info.main"
            dataLabel={assets?.length || 0}
            word="asset"
            handleClick={() => handleClick('/assets/list')}
          />
        </OverviewCardWrapper>
      </Stack>
    </Stack>
  );
}
