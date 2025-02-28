import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';
import SimpleModal from '@common/SimpleModal';
import { FILTER_OPTIONS } from '@features/Reports/constants';
import ReportsHeader from '@features/Reports/ReportHeader/ReportsHeader';
import ReportContent from '@features/Reports/ReportContent/ReportContent';
import ReportsFilterMenu from '@features/Reports/ReportsFilterMenu/ReportsFilterMenu';
import { useAssets } from '@services/assetsApi';
import { useMaintenancePlans } from '@services/maintenancePlanApi';

export default function Reports() {
  const { data: inventories = [], isLoading: loading } = useAssets();
  const reports = [];
  const reportLoading = false;
  // const { data: reports = [], isLoading: reportLoading } = useAssets();
  const { data: maintenancePlanList = [], isLoading: maintenancePlanListLoading } = useMaintenancePlans();

  // const dispatch = useDispatch();

  // const { inventories = [], loading } = useSelector((state) => state.inventory);
  // const { reports = [], loading: reportLoading } = useSelector((state) => state.reports);
  // const { maintenancePlan: maintenancePlanList = [], loading: maintenancePlanListLoading } = useSelector(
  // (state) => state.maintenance
  // );

  const [displayModal, setDisplayModal] = useState(false);
  const [includeOverdue, setIncludeOverdue] = useState(true);

  // const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState([]);
  const [sinceValue, setSinceValue] = useState(FILTER_OPTIONS.find((item) => item.label === 'ytd').value);

  const downloadReports = () => {
    // dispatch(reportActions.downloadReports({ since: sinceValue, includeOverdue: includeOverdue, inventories }));
  };

  const closeFilter = () => setDisplayModal(false);

  // useEffect(() => {
  //   if (!maintenancePlanListLoading && maintenancePlanList.length > 0) {
  //     setSelectedMaintenancePlan(maintenancePlanList[0]);
  //   }
  // }, [maintenancePlanListLoading, maintenancePlanList.length]);

  // useEffect(() => {
  //   dispatch(maintenancePlanActions.getPlans());
  //   dispatch(inventoryActions.getAllInventoriesForUser({ since: sinceValue }));
  // }, []);

  // useEffect(() => {
  //   if (!reportLoading && reports.length <= 0) {
  //     dispatch(reportActions.getReports({ since: dayjs().startOf('year').toISOString(), includeOverdue: true }));
  //   }
  // }, [reportLoading]);

  return (
    <Stack spacing={1} data-tour="reports-0">
      <ReportsHeader
        sinceValue={sinceValue}
        reports={reports}
        loading={loading}
        selectedAsset={inventories[0] || {}}
        setDisplayModal={setDisplayModal}
        downloadReports={downloadReports}
        selectedMaintenancePlan={maintenancePlanList?.length > 0 ? maintenancePlanList[0] : {}}
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
}
