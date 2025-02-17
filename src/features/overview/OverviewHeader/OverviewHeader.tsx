import * as React from 'react';
import { Stack } from '@mui/material';

import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import RowHeader from '@utils/RowHeader';
import OverviewCardWrapper from '@features/overview/OverviewCard/OverviewCardWrapper';
import OverviewCardItem from '@features/overview/OverviewCard/OverviewCardItem';

interface IOverviewHeaderProps {
    assetsUnderCategories: Array<any>;
    assetsUnderMaintenancePlans: Array<any>;
    assetsPastDue: Array<any>;
}

const OverviewHeader: React.FunctionComponent<IOverviewHeaderProps> = ({
    assetsUnderCategories = [],
    assetsUnderMaintenancePlans = [],
    assetsPastDue = [],
}) => {
    return (
        <Stack data-tour="overview-1">
            <RowHeader title="Asset Summary" caption="View details about your assets." />
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="assigned categories"
                        icon={<CategoryRounded />}
                        color="info.main"
                        tooltipTitle={assetsUnderCategories.map((v) => v.name).join(', ')}
                        count={assetsUnderCategories.flatMap((v) => v.items).length}
                    />
                </OverviewCardWrapper>
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="assigned maintenance plan"
                        icon={<EngineeringRounded />}
                        color="info.main"
                        tooltipTitle={assetsUnderMaintenancePlans.map((v) => v.name).join(', ')}
                        count={assetsUnderMaintenancePlans.flatMap((v) => v.items).length}
                    />
                </OverviewCardWrapper>
                <OverviewCardWrapper>
                    <OverviewCardItem
                        label="past return deadline"
                        icon={<WarningRounded />}
                        color="error.main"
                        tooltipTitle={assetsPastDue.join(', ')}
                        count={assetsPastDue.length}
                    />
                </OverviewCardWrapper>
            </Stack>
        </Stack>
    );
};

export default OverviewHeader;
