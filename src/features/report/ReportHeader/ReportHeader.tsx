import * as React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Stack } from '@mui/material';

import { DownloadRounded, FilterAltRounded } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import { capitalizeFirstLetter, formatDate } from '@utils/utility';
import ReportCardWrapper from '@features/report/ReportCard/ReportCardWrapper';
import { ReportType } from '@features/report/types';
import ReportItemDetails from '@features/report/ReportItemDetails/ReportItemDetails';
import { AssetType } from '@features/assets/types';
import { MaintenancePlanType } from '@utils/types';

dayjs.extend(relativeTime);

interface IReportHeaderProps {
  sinceValue: string;
  reports: ReportType[];
  loading: boolean;
  selectedAsset: AssetType;
  selectedMaintenancePlan: MaintenancePlanType;
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

  const renderCaption = (): string => {
    return sinceValue
      ? `Viewing reports since ${dayjs(sinceValue).fromNow()}`
      : `Viewing results for the ${dayjs().startOf('year').fromNow()}`;
  };

  const generateAvatarValue = (updator: string): string => {
    if (Object.keys(selectedMaintenancePlan).length > 0) {
      return capitalizeFirstLetter(updator.charAt(0));
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
            avatarValue={generateAvatarValue(selectedAsset?.updator)}
            label={selectedAsset?.name || ''}
            caption={selectedAsset?.description || ''}
          />
        </ReportCardWrapper>
        <ReportCardWrapper title="Maintenance due" dataTour={'reports-6'}>
          <ReportItemDetails
            loading={loading}
            avatarValue={generateAvatarValue(selectedAsset?.updator)}
            label={selectedMaintenancePlan?.name || ''}
            caption={selectedMaintenancePlan?.description || ''}
          />
        </ReportCardWrapper>
      </Stack>
    </Stack>
  );
};

export default ReportHeader;
