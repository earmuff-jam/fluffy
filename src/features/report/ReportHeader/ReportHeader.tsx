import * as React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Stack } from '@mui/material';

import { DownloadRounded, FilterAltRounded } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import { capitalizeFirstLetter } from '@utils/utility';

dayjs.extend(relativeTime);

interface IReportHeaderProps {
  sinceValue: string;
  reports: [];
  loading: boolean;
  selectedAsset: {};
  selectedMaintenancePlan: {};
  setDisplayModal: (val: boolean) => void;
  downloadReports: () => void;
}

const ReportHeader: React.FunctionComponent<IReportHeaderProps> = ({
  sinceValue,
  reports,
  loading,
  selectedAsset,
  selectedMaintenancePlan,
  setDisplayModal,
  downloadReports,
}) => {
  const handleFilter = () => setDisplayModal(true);

  const renderCaption = () => {
    if (sinceValue) {
      return `Viewing reports since ${dayjs(sinceValue).fromNow()}`;
    } else {
      return `Viewing results for the ${dayjs().startOf('year').fromNow()}`;
    }
  };

  return (
    <Stack spacing={1}>
      <RowHeader
        title="Reports Overview"
        caption={renderCaption()}
        primaryStartIcon={<FilterAltRounded />}
        primaryButtonTextLabel={'Filter results'}
        handleClickPrimaryButton={handleFilter}
        secondaryStartIcon={<DownloadRounded />}
        secondaryButtonTextLabel={'Export'}
        primaryBtnDataTour={'reports-1'}
        secondaryBtnDataTour={'reports-2'}
        handleClickSecondaryButton={() => downloadReports()}
      />
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
        <ReportCardWrapper
          title="Valuation"
          chipLabel={`Since ${formatDate(sinceValue)}`}
          value={`$${reports[0]?.total_valuation.toFixed(2) || 0.0}`}
          footerText="Total cost of items in"
          footerSuffix="dollar value."
          dataTour={'reports-3'}
        />
        <ReportCardWrapper
          title="Categorized Assets"
          dataTour={'reports-4'}
          chipLabel={`Since ${formatDate(sinceValue)}`}
          value={`$${reports[0]?.cost_category_items.toFixed(2) || 0.0}`}
        />
      </Stack>
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
        <ReportCardWrapper title="Recently Added Asset" dataTour={'reports-5'}>
          <ReportItemDetails
            loading={loading}
            avatarValue={
              Object.keys(selectedMaintenancePlan) > 0 && capitalizeFirstLetter(selectedAsset?.updater_name?.charAt(0))
            }
            label={selectedAsset?.name || ''}
            caption={selectedAsset?.description || ''}
          />
        </ReportCardWrapper>
        <ReportCardWrapper title="Maintenance due" dataTour={'reports-6'}>
          <ReportItemDetails
            loading={loading}
            avatarValue={
              Object.keys(selectedMaintenancePlan) > 0 &&
              capitalizeFirstLetter(selectedMaintenancePlan?.updator?.charAt(0))
            }
            label={selectedMaintenancePlan?.name || ''}
            caption={selectedMaintenancePlan?.description || ''}
          />
        </ReportCardWrapper>
      </Stack>
    </Stack>
  );
};

export default ReportHeader;
