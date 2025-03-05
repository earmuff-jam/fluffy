import { useState } from 'react';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';
import SimpleModal from '@common/SimpleModal';
import { FILTER_OPTIONS } from '@features/Reports/constants';
import ReportsHeader from '@features/Reports/ReportHeader/ReportsHeader';
import ReportContent from '@features/Reports/ReportContent/ReportContent';
import ReportsFilterMenu from '@features/Reports/ReportsFilterMenu/ReportsFilterMenu';
import { useFetchAssetReportByDate } from '@services/assetsApi';
import { useFetchMaintenancePlans } from '@services/maintenancePlanApi';

export default function Reports() {

  const [displayModal, setDisplayModal] = useState(false);
  const [includeOverdue, setIncludeOverdue] = useState(true);
  const [sinceValue, setSinceValue] = useState(FILTER_OPTIONS.find((item) => item.label === 'ytd').value);

  const { data: assets = [], isLoading: isAssetsLoading } = useFetchAssetReportByDate(sinceValue);
  const { data: maintenancePlanList = [], isLoading: maintenancePlanListLoading } = useFetchMaintenancePlans();

  const downloadReports = () => {
    // dispatch(reportActions.downloadReports({ since: sinceValue, includeOverdue: includeOverdue, assets }));
  };

  const closeFilter = () => setDisplayModal(false);

  const totalAssetValuation = assets.reduce((acc, el) => {
    acc += +el.price;
    return acc;
  }, 0);

  return (
    <Stack spacing={1} data-tour="reports-0">
      <ReportsHeader
        sinceValue={sinceValue}
        reports={[]}
        loading={isAssetsLoading}
        totalAssetValuation={totalAssetValuation}
        selectedAsset={assets[0] || {}}
        setDisplayModal={setDisplayModal}
        downloadReports={downloadReports}
        selectedMaintenancePlan={maintenancePlanList?.length > 0 ? maintenancePlanList[0] : {}}
      />
      <ReportContent sinceValue={sinceValue} assets={assets} />
      {displayModal && (
        <SimpleModal
          title="Filter results"
          subtitle="Select time range to filter the selected results for."
          handleClose={closeFilter}
          maxSize="xs"
        >
          <ReportsFilterMenu
            handleClose={closeFilter}
            sinceValue={sinceValue}
            setSinceValue={setSinceValue}
            includeOverdue={includeOverdue}
            setIncludeOverdue={setIncludeOverdue}
          />
        </SimpleModal>
      )}
    </Stack>
  );
}
