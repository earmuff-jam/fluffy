import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Box } from '@mui/material';

import { produce } from 'immer';
import { buildXcel } from '@utils/utils';
import { MAINTENANCE_PLAN_COLUMN_HEADERS } from '@features/MaintenancePlan/constants';

import SimpleModal from '@utils/SimpleModal';
import SectionCardHeader from '@common/SectionCard/SectionCardHeader';
import SectionCardContent from '@common/SectionCard/SectionCardContent';
import AddMaintenancePlan from '@features/MaintenancePlan/AddMaintenancePlan';

import {
  useDownloadMaintenancePlans,
  useFetchMaintenancePlans,
  useRemoveMaintenancePlan,
} from '@services/maintenancePlanApi';

const MaintenancePlanList = () => {
  const { data: maintenancePlans, isLoading } = useFetchMaintenancePlans();

  const { mutate: removeMaintenancePlan } = useRemoveMaintenancePlan();
  const {
    mutate: downloadMaintenancePlans,
    data: downloadedMaintenancePlans = [],
    isLoading: isMaintenancePlansLoading,
    reset,
  } = useDownloadMaintenancePlans();

  const [sortedData, setSortedData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(true); // false ascending

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedMaintenancePlanID, setSelectedMaintenancePlanID] = useState('');

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedMaintenancePlanID('');
  };

  const filterAndBuildMaintenancePlans = (plans, selectedFilter) => {
    if (selectedFilter.length > 0) {
      return plans.filter((element) => element.status === selectedFilter);
    } else {
      return sortedData;
    }
  };

  useEffect(() => {
    if (downloadedMaintenancePlans.length > 0) {
      const formattedMaintenancePlans = produce(downloadedMaintenancePlans, (draft) => {
        draft.forEach((maintenancePlanItem, index) => {
          draft[index] = Object.fromEntries(
            Object.values(MAINTENANCE_PLAN_COLUMN_HEADERS)
              .sort((a, b) => a.id - b.id) // Ensure order
              .map(({ label, colName, modifier }) => [
                label,
                modifier && colName !== 'updatedAt'
                  ? modifier(maintenancePlanItem[colName])
                  : maintenancePlanItem[colName] || '-',
              ])
          );
        });
      });

      buildXcel(
        Object.values(MAINTENANCE_PLAN_COLUMN_HEADERS).map((header) => header.label),
        formattedMaintenancePlans,
        'maintenancePlan.xlsx',
        `maintenancePlan-${dayjs().format('DD-MM-YYYY')}`
      );

      reset();
    }
  }, [downloadedMaintenancePlans, reset]);

  useEffect(() => {
    if (maintenancePlans?.length > 0) {
      const draft = [...maintenancePlans].sort((a, b) => {
        return sortingOrder
          ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() // Descending
          : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(); // Ascending
      });
      setSortedData(draft);
    } else {
      setSortedData(maintenancePlans);
    }
  }, [sortingOrder, maintenancePlans]);

  return (
    <Box sx={{ py: 2 }} data-tour="plans-0">
      <SectionCardHeader
        title="Maintenance Plans"
        caption={selectedFilter ? `Applying ${selectedFilter} status filter` : 'Assign items to maintenance plans'}
        primaryBtnTitle="Add plan"
        toggleModal={() => setDisplayModal(!displayModal)}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        handleDownload={() => downloadMaintenancePlans()}
        addBtnDataTour={'plans-1'}
        downloadBtnDataTour={'plans-2'}
        filterBtnDataTour={'plans-3'}
        sortBtnDataTour={'plans-4'}
        isSecondaryButtonLoading={isMaintenancePlansLoading}
        disableDownloadIcon={!maintenancePlans || (Boolean(maintenancePlans) && maintenancePlans.length <= 0)}
      />
      <SectionCardContent
        loading={isLoading}
        prefixURI={'plan'}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        setSelectedID={setSelectedMaintenancePlanID}
        removeItem={(id) => removeMaintenancePlan(id)}
        content={filterAndBuildMaintenancePlans(maintenancePlans, selectedFilter)}
        emptyComponentSubtext="Add maintenance plans"
      />
      {displayModal && (
        <SimpleModal
          title="Add new maintenance plan"
          subtitle="Create maintenance plan to associate assets and periodically perform checks on them.
"
          handleClose={handleClose}
          maxSize="sm"
        >
          <AddMaintenancePlan
            maintenancePlan={maintenancePlans}
            handleClose={handleClose}
            selectedMaintenancePlanID={selectedMaintenancePlanID}
            setSelectedMaintenancePlanID={setSelectedMaintenancePlanID}
          />
        </SimpleModal>
      )}
    </Box>
  );
};

export default MaintenancePlanList;
