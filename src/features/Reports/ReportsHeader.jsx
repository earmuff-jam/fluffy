import dayjs from 'dayjs';

import { Stack } from '@mui/material';
import { DownloadRounded, FilterAltRounded } from '@mui/icons-material';

import RowHeader from '@common/RowHeader';
import relativeTime from 'dayjs/plugin/relativeTime';

import ReportCardWrapper from '@features/Reports/ReportCardWrapper';
import ReportItemDetails from '@features/Reports/ReportItemDetails';

import { capitalizeFirstLetter, EmptyComponent, formatDate } from '@common/utils';

dayjs.extend(relativeTime);

export default function ReportsHeader({
  sinceValue,
  reports,
  loading,
  totalAssetValuation,
  selectedAsset,
  selectedMaintenancePlan,
  isSecondaryButtonLoading,
  setDisplayModal,
  downloadReports,
}) {
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
        handleClickPrimaryButton={() => setDisplayModal(true)}
        secondaryStartIcon={<DownloadRounded />}
        secondaryButtonTextLabel={'Export'}
        primaryBtnDataTour={'reports-1'}
        secondaryBtnDataTour={'reports-2'}
        isSecondaryButtonLoading={isSecondaryButtonLoading}
        handleClickSecondaryButton={() => downloadReports()}
      />
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
        <ReportCardWrapper
          title="Valuation"
          loading={loading}
          chipLabel={`Since ${formatDate(sinceValue)}`}
          value={`$${totalAssetValuation?.toFixed(2) || 0.0}`}
          footerText="Total cost of items in"
          footerSuffix="dollar value."
          dataTour={'reports-3'}
        />
        <ReportCardWrapper
          title="Categorized Assets"
          dataTour={'reports-4'}
          loading={loading}
          chipLabel={`Since ${formatDate(sinceValue)}`}
          value={`$${reports[0]?.cost_category_items?.toFixed(2) || 0.0}`}
        />
      </Stack>
      <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
        <ReportCardWrapper title="Recently Added Asset" dataTour={'reports-5'}>
          {Object.keys(selectedAsset).length > 0 ? (
            <ReportItemDetails
              loading={loading}
              avatarValue={capitalizeFirstLetter(selectedAsset?.updator?.charAt(0))}
              label={capitalizeFirstLetter(selectedAsset?.name) || ''}
              caption={selectedAsset?.description || ''}
            />
          ) : (
            <EmptyComponent padding="1rem 0rem" />
          )}
        </ReportCardWrapper>
        <ReportCardWrapper title="Maintenance due" dataTour={'reports-6'}>
          {Object.keys(selectedMaintenancePlan).length > 0 ? (
            <ReportItemDetails
              loading={loading}
              avatarValue={capitalizeFirstLetter(selectedMaintenancePlan?.updator?.charAt(0))}
              label={selectedMaintenancePlan?.name || ''}
              caption={selectedMaintenancePlan?.description || ''}
            />
          ) : (
            <EmptyComponent padding="1rem 0rem" />
          )}
        </ReportCardWrapper>
      </Stack>
    </Stack>
  );
}
