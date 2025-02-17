import * as React from 'react';

import { Stack } from '@mui/material';

import { Inventory2Rounded, PaidRounded } from '@mui/icons-material';
import RowHeader from '@utils/RowHeader';
import OverviewCardWrapper from '@features/overview/OverviewCard/OverviewCardWrapper';
import OverviewCardItem from '@features/overview/OverviewCard/OverviewCardItem';


interface IOverviewContentSummaryProps {
    assets: Array<any>;
}

const OverviewContentSummary: React.FunctionComponent<IOverviewContentSummaryProps> = ({ assets = [] }) => {
    const zeroCostItems = assets?.filter((v) => v.price === 0);
    const totalAssetCosts = assets?.reduce((acc, el) => {
        acc += el?.price || 0;
        return acc;
    }, 0);

    return (
        <Stack data-tour="overview-2">
            <RowHeader title="Cost Summary" caption="View details about associated costs and unestimated assets." />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="Total estimated cost"
                        icon={<PaidRounded />}
                        color="success.main"
                        count={totalAssetCosts}
                        word=""
                        tooltipTitle={'Total approximate dollar value of all assets.'}
                    />
                </OverviewCardWrapper>
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="Total Unestimated assets"
                        icon={<Inventory2Rounded />}
                        color="text.secondary"
                        count={zeroCostItems?.length || 0}
                        word="asset"
                        tooltipTitle={'Total assets that do not have cost price associated with them.'}
                    />
                </OverviewCardWrapper>
            </Stack>
        </Stack>
    );
};

export default OverviewContentSummary;
