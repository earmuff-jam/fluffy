import * as React from 'react';

import { Skeleton, Stack } from '@mui/material';

import dayjs from 'dayjs';
import RowHeader from '@utils/RowHeader';
import OverviewHeader from '@features/overview/OverviewHeader/OverviewHeader';
import OverviewContent from '@features/overview/OverviewContent/OverviewContent';

interface IOverviewProps {
}

const Overview: React.FunctionComponent<IOverviewProps> = (props) => {
    // const dispatch = useDispatch();
    const assetSummary = {
        AssetList: [],
        AssetSummaryList: []
    };
    const loading = false;

    const fetchAssignedAssets = (assets = [], filterParam: string) => {
        // assets within filterParam must be present
        assets?.filter((asset) => asset.type.toUpperCase() === filterParam && asset.items[0] != '');
    };

    const assetsPastDue = assetSummary?.AssetList?.reduce((acc, el) => {
        if (dayjs(el.returntime).isBefore(dayjs())) {
            acc.push(el.name);
        }
        return acc;
    }, []);

    React.useEffect(() => {
        // dispatch(assetSummaryActions.getAssetSummary());
    }, []);

    if (loading) {
        return <Skeleton height="50vh" />;
    }

    return (
        <Stack data-tour="overview-0">
            <RowHeader title="Overview" caption="View a summarized report about your assets." />
            <Stack spacing={2}>
                <OverviewHeader
                    assetsUnderCategories={fetchAssignedAssets(assetSummary?.AssetSummaryList, 'C')}
                    assetsUnderMaintenancePlans={fetchAssignedAssets(assetSummary?.AssetSummaryList, 'M')}
                    assetsPastDue={assetsPastDue}
                />
                <OverviewContent
                    assets={assetSummary?.AssetList || []}
                    categories={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'C')}
                    maintenancePlans={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'M')}
                />
            </Stack>
        </Stack>
    );
};

export default Overview;
