import * as React from 'react';

import { Box } from '@mui/material';

import SectionCardHeader from '@common/SectionCard/SectionCardHeader';
import SectionCardContent from '@common/SectionCard/SectionCardContent';
import SimpleModal from '@utils/SimpleModal';
import AddPlan from '@features/maintenance/AddPlan';

interface IPlanProps {}

const Plan: React.FunctionComponent<IPlanProps> = (props) => {
  const maintenancePlan = [];
  const loading = false;

  const [sortedData, setSortedData] = React.useState([]);
  const [displayModal, setDisplayModal] = React.useState(false);

  const [selectedFilter, setSelectedFilter] = React.useState('');
  const [sortingOrder, setSortingOrder] = React.useState(true); // false ascending
  const [selectedMaintenancePlanID, setSelectedMaintenancePlanID] = React.useState('');

  const toggleModal = () => setDisplayModal(!displayModal);
  const handleCloseAddNewPlan = () => {
    setDisplayModal(false);
    setSelectedMaintenancePlanID('');
  };

  const handleDownload = () => {
    //   dispatch(maintenancePlanActions.download());
  };

  const filterAndBuildMaintenancePlans = (plans, selectedFilter) => {
    if (selectedFilter.length > 0) {
      return plans.filter((element) => element.maintenance_status_name === selectedFilter);
    } else {
      return sortedData;
    }
  };

  const removeSelectedMaintenancePlan = (id: string) => {
    // dispatch(maintenancePlanActions.removePlan(id));
  };

  // React.useEffect(() => {
  //   if (sortingOrder) {
  //     const draft = [...maintenancePlan].sort(
  //       (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  //     );
  //     setSortedData(draft);
  //   } else {
  //     setSortedData(maintenancePlan);
  //   }
  // }, [sortingOrder, maintenancePlan]);

  React.useEffect(() => {
    // dispatch(maintenancePlanActions.getPlans(100));
  }, []);

  return (
    <Box sx={{ py: 2 }} data-tour="plans-0">
      <SectionCardHeader
        title="Maintenance Plans"
        caption={selectedFilter ? `Applying ${selectedFilter} status filter` : 'Assign items to maintenance plans'}
        primaryBtnTitle="Add plan"
        toggleModal={toggleModal}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        handleDownload={handleDownload}
        addBtnDataTour={'plans-1'}
        downloadBtnDataTour={'plans-2'}
        filterBtnDataTour={'plans-3'}
        sortBtnDataTour={'plans-4'}
        disableDownloadIcon={Boolean(maintenancePlan) && maintenancePlan.length <= 0}
      />
      <SectionCardContent
        loading={loading}
        prefixURI={'plan'}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        setSelectedID={setSelectedMaintenancePlanID}
        removeItem={removeSelectedMaintenancePlan}
        content={filterAndBuildMaintenancePlans(maintenancePlan, selectedFilter)}
      />
      {displayModal && (
        <SimpleModal
          title="Add new maintenance plan"
          subtitle="Create maintenance plan to associate assets and periodically perform checks on them.
  "
          handleClose={handleCloseAddNewPlan}
          maxSize="sm"
        >
          <AddPlan
            maintenancePlan={maintenancePlan}
            handleCloseAddNewPlan={handleCloseAddNewPlan}
            selectedMaintenancePlanID={selectedMaintenancePlanID}
            setSelectedMaintenancePlanID={setSelectedMaintenancePlanID}
          />
        </SimpleModal>
      )}
    </Box>
  );
};

export default Plan;
