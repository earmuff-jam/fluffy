import * as React from 'react';
import { Stack } from '@mui/material';
import OverviewContentSummary from '@features/overview/OverviewContent/OverviewContentSummary';
import OverviewContentAssetBreakdown from '@features/overview/OverviewContent/OverviewContentAssetBreakdown';
import OverviewContentAssetGraph from '@features/overview/OverviewContent/OverviewContentAssetGraph';

interface IOverviewContentProps {
    assets: Array<any>;
    categories: Array<any>;
    maintenancePlans: Array<any>;
}


const OverviewContent: React.FunctionComponent<IOverviewContentProps> = ({ assets = [], categories = [], maintenancePlans = [] }) => {
    return (
        <Stack spacing={2}>
            <OverviewContentSummary assets={assets} />
            <OverviewContentAssetBreakdown assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
            <OverviewContentAssetGraph assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
        </Stack>
    )
};

export default OverviewContent;
