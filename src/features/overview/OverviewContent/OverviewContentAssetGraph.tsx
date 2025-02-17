import * as React from 'react';

import { Stack, Card, CardContent } from '@mui/material';

import RowHeader from '@utils/RowHeader';
import PieChart from '@common/Chart/PieChart';
import { capitalizeFirstLetter } from '@utils/utility';
import { OVERVIEW_GRAPH_LABELS } from '@features/overview/constants';

interface IOverviewContentAssetGraphProps {
    assets: Array<any>;
    categories: Array<any>;
    maintenancePlans: Array<any>;
}

const OverviewContentAssetGraph: React.FunctionComponent<IOverviewContentAssetGraphProps> = ({ assets = [], categories = [], maintenancePlans = [] }) => {

    const formattedData = [categories, maintenancePlans, assets].map((v, index) => ({
        label: capitalizeFirstLetter(OVERVIEW_GRAPH_LABELS[index].label),
        count: v?.length || 0,
        backgroundColor: OVERVIEW_GRAPH_LABELS[index].color,
        borderColor: OVERVIEW_GRAPH_LABELS[index].color,
    }));

    return (
        <Stack data-tour="overview-4">
            <RowHeader title="Graph" caption="View details for asset summary" />
            <Card>
                <CardContent>
                    <Stack>
                        <Stack direction="row" spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                            <PieChart height="15rem" label="assets summary" data={formattedData} />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    )
};

export default OverviewContentAssetGraph;
