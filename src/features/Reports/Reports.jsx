import { useState } from 'react';

import dayjs from 'dayjs';

import { Stack } from '@mui/material';

import SimpleModal from '@utils/SimpleModal';
import { FILTER_OPTIONS } from '@features/Reports/constants';

import ReportsHeader from '@features/Reports/ReportsHeader';
import ReportContent from '@features/Reports/ReportContent';
import ReportsFilterMenu from '@features/Reports/ReportsFilterMenu';

import { buildXcel } from '@utils/utils';
import { ASSET_LIST_HEADERS } from '@features/Assets/constants';

import { useFetchMaintenancePlans } from '@services/maintenancePlanApi';
import { useDownloadAssetsList, useFetchAssetReportByDate } from '@services/assetsApi';

export default function Reports() {
  const [displayModal, setDisplayModal] = useState(false);
  const [includeOverdue, setIncludeOverdue] = useState(true);

  const defaultSinceValue = FILTER_OPTIONS.find((item) => item.label === 'ytd').value;
  const [sinceValue, setSinceValue] = useState(defaultSinceValue);
  const [tempSinceValue, setTempSinceValue] = useState(sinceValue);

  const { data: maintenancePlanList = [] } = useFetchMaintenancePlans();
  const { data: assets = [], isLoading: isAssetsLoading } = useFetchAssetReportByDate(sinceValue);
  const { data: downloadedAssets = [], isLoading: isAssetsDownloading, refetch } = useDownloadAssetsList(sinceValue);

  const closeFilter = () => setDisplayModal(false);

  const downloadReports = () => {
    refetch();
  };

  const applyFilter = () => {
    setSinceValue(tempSinceValue);
    closeFilter();
  };

  const totalAssetValuation = assets.reduce((acc, el) => {
    acc += +el.price;
    return acc;
  }, 0);

  if (downloadedAssets.length > 0) {
    const formattedAssets = downloadedAssets.map((v) =>
      Object.assign(
        {},
        ...Object.values(ASSET_LIST_HEADERS)
          .sort((a, b) => a.id - b.id) // Ensure order
          .map((header) => ({
            [header.label]: header.modifier ? header.modifier(v[header.colName]) : v[header.colName] || '-',
          }))
      )
    );

    buildXcel(
      Object.values(ASSET_LIST_HEADERS).map((header) => header.label),
      formattedAssets,
      'reports.xlsx',
      `reports-${dayjs().format('DD-MM-YYYY')}`
    );
  }

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
        isSecondaryButtonLoading={isAssetsDownloading}
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
            applyFilter={applyFilter}
            sinceValue={sinceValue}
            setSinceValue={setTempSinceValue}
            includeOverdue={includeOverdue}
            setIncludeOverdue={setIncludeOverdue}
          />
        </SimpleModal>
      )}
    </Stack>
  );
}
