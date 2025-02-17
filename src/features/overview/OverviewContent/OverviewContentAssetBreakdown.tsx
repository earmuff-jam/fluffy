import * as React from 'react';

import { Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import RowHeader from '@utils/RowHeader';
import OverviewCardWrapper from '@features/overview/OverviewCard/OverviewCardWrapper';
import OverviewCardItem from '@features/overview/OverviewCard/OverviewCardItem';

interface IOverviewContentAssetBreakdownProps {
    assets: Array<any>;
    categories: Array<any>;
    maintenancePlans: Array<any>;
}


const OverviewContentAssetBreakdown: React.FunctionComponent<IOverviewContentAssetBreakdownProps> = ({ assets = [], categories = [], maintenancePlans = [] }) => {
    const navigate = useNavigate();
    const handleClick = (to: string) => navigate(to);

    return (
        <Stack data-tour="overview-3">
            <RowHeader title="Asset Breakdown" caption="View details about your categories and plans." />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="as categories"
                        icon={<CategoryRounded />}
                        color="info.main"
                        count={categories.length || 0}
                        word="item"
                        handleClick={() => handleClick('/categories/list')}
                    />
                </OverviewCardWrapper>
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="as maintenance plans"
                        icon={<EngineeringRounded />}
                        color="info.main"
                        count={maintenancePlans.length || 0}
                        word="item"
                        handleClick={() => handleClick('/plans/list')}
                    />
                </OverviewCardWrapper>
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="are registered"
                        icon={<WarningRounded />}
                        color="info.main"
                        count={assets?.length || 0}
                        word="asset"
                        handleClick={() => handleClick('/inventories/list')}
                    />
                </OverviewCardWrapper>
            </Stack>
        </Stack>
    );
};

export default OverviewContentAssetBreakdown;
