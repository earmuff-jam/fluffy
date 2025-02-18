import * as React from 'react';

import { Stack } from '@mui/material';
import { AssetType } from '@features/assets/types';
import { FILTER_OPTIONS } from '@features/report/constants';
import { FilterOptionsType } from '@features/report/types';
import SimpleModal from '@utils/SimpleModal';
import ReportHeader from '@features/report/ReportHeader/ReportHeader';

const Report: React.FunctionComponent = () => {
  const inventories = [] as AssetType[];
  const loading = false;

  const reports = [];
  const reportsLoading = false;

  const maintenancePlanList = [];
  const maintenancePlanListLoading = false;

  const [selectedAsset, setSelectedAsset] = React.useState<AssetType>(null);
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);
  const [includeOverdue, setIncludeOverdue] = React.useState<boolean>(true);

  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = React.useState([]);
  const [sinceValue, setSinceValue] = React.useState<string>(
    FILTER_OPTIONS.find((item: FilterOptionsType) => item.label === 'ytd').value
  );

  const downloadReports = () => {
    // dispatch(reportActions.downloadReports({ since: sinceValue, includeOverdue: includeOverdue, inventories }));
  };

  const closeFilter = () => setDisplayModal(false);

  React.useEffect(() => {
    if (!loading && inventories.length > 0) {
      setSelectedAsset(inventories[0]);
    }
  }, [loading, inventories.length]);

  React.useEffect(() => {
    if (!maintenancePlanListLoading && maintenancePlanList.length > 0) {
      setSelectedMaintenancePlan(maintenancePlanList[0]);
    }
  }, [maintenancePlanListLoading, maintenancePlanList.length]);

  React.useEffect(() => {
    // dispatch(maintenancePlanActions.getPlans());
    // dispatch(inventoryActions.getAllInventoriesForUser({ since: sinceValue }));
  }, []);

  React.useEffect(() => {
    if (!reportsLoading && reports.length <= 0) {
      // dispatch(reportActions.getReports({ since: dayjs().startOf('year').toISOString(), includeOverdue: true }));
    }
  }, [reportsLoading]);

  return (
    <Stack spacing={1} data-tour="reports-0">
      <ReportHeader
        sinceValue={sinceValue}
        reports={reports}
        loading={loading}
        selectedAsset={selectedAsset}
        setDisplayModal={setDisplayModal}
        downloadReports={downloadReports}
        selectedMaintenancePlan={selectedMaintenancePlan}
      />
      <ReportContent sinceValue={sinceValue} assets={inventories} />
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
};

export default Report;
