import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

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
  const { mutate: downloadMaintenancePlans } = useDownloadMaintenancePlans();

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
