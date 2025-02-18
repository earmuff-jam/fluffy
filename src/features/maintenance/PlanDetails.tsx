import * as React from 'react';

import { Skeleton, Stack } from '@mui/material';

import { AddRounded } from '@mui/icons-material';

import { useParams } from 'react-router-dom';
import ItemDetailsHeader from '@features/selected/ItemDetailsHeader';
import ItemDetailsContent from '@features/selected/ItemDetailsContent';
import ItemGraphWrapper from '@features/selected/ItemGraph/ItemGraphWrapper';
import SimpleModal from '@utils/SimpleModal';
import ConfirmationBox from '@utils/ConfirmationBox';

interface IPlanDetailsProps {}

const PlanDetails: React.FunctionComponent<IPlanDetailsProps> = (props) => {
  const { id } = useParams();

  const selectedMaintenancePlan = [];
  const itemsInMaintenancePlan = [];
  const selectedMaintenancePlanImage = '';
  const loading = false;

  const [selectedIDList, setSelectedIDList] = React.useState([]);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [openConfirmationBoxModal, setOpenConfirmationBoxModal] = React.useState(false);

  const handleOpenModal = () => {
    setDisplayModal(true);
    // dispatch(inventoryActions.getAllInventoriesForUser());
  };

  const handleOpenConfirmationBoxModal = () => setOpenConfirmationBoxModal(!openConfirmationBoxModal);

  const resetConfirmationBoxModal = () => setOpenConfirmationBoxModal(false);

  const confirmDelete = () => {
    // dispatch(
    //   maintenancePlanItemActions.removeItemsFromMaintenancePlan({
    //     id: selectedMaintenancePlan?.id,
    //     selectedIDList,
    //   })
    // );
    enqueueSnackbar(`Removed association of assets for ${selectedMaintenancePlan.name}.`, {
      variant: 'default',
    });
    setSelectedIDList([]);
    resetConfirmationBoxModal();
  };

  const addItems = () => {
    const collaborators = selectedMaintenancePlan.sharable_groups;
    // dispatch(
    //   maintenancePlanItemActions.addItemsInPlan({
    //     id: selectedMaintenancePlan?.id,
    //     selectedIDList,
    //     collaborators,
    //   })
    // );
    enqueueSnackbar(`Added association of assets for ${selectedMaintenancePlan.name}.`, {
      variant: 'success',
    });
    resetSelection();
  };

  const handleRemoveAssociation = () => {
    handleOpenConfirmationBoxModal();
  };

  const resetSelection = () => {
    setDisplayModal(false);
    setSelectedIDList([]);
  };

  React.useEffect(() => {
    if (!loading) {
      // dispatch(maintenancePlanItemActions.getSelectedImage({ id }));
    }
  }, [id, loading]);

  React.useEffect(() => {
    if (id) {
      // dispatch(maintenancePlanItemActions.getItemsInMaintenancePlan(id));
      // dispatch(maintenancePlanItemActions.getSelectedMaintenancePlan(id));
    }
  }, [id]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-plan-0">
      <ItemDetailsHeader
        label={selectedMaintenancePlan?.name ? `${selectedMaintenancePlan.name} Overview` : 'Maintenance Plan Overview'}
        caption="View details of selected maintenance plan"
        item={selectedMaintenancePlan}
        image={selectedMaintenancePlanImage}
        favBtnDataTour="selected-plan-1"
        shareBtnDataTour="selected-plan-2"
        imageBtnDataTour="selected-plan-3"
      />
      <ItemDetailsContent
        selectedIDList={selectedIDList}
        setSelectedIDList={setSelectedIDList}
        items={itemsInMaintenancePlan}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={handleRemoveAssociation}
        tableDataTour="selected-plan-6"
        primaryBtnDataTour="selected-plan-4"
        secondaryBtnDataTour="selected-plan-5"
      />
      <ItemGraphWrapper associatedAssets={itemsInMaintenancePlan} graphDataTour="selected-plan-7" />
      {displayModal && (
        <SimpleModal
          title={`Add items to ${selectedMaintenancePlan?.name}`}
          handleClose={resetSelection}
          maxSize="md"
          showSecondaryButton
          secondaryButtonAction={addItems}
          secondaryButtonIcon={<AddRounded />}
          disableSecondaryButton={selectedIDList.length <= 0}
        >
          <AddItem
            selectedIDList={selectedIDList}
            setSelectedIDList={setSelectedIDList}
            resetSelection={resetSelection}
            associatedItems={itemsInMaintenancePlan}
          />
        </SimpleModal>
      )}
      openConfirmationBoxModal && (
      <ConfirmationBox
        title="Confirm deletion"
        handleClose={resetConfirmationBoxModal}
        maxSize="xs"
        confirmDelete={confirmDelete}
      />
      )
    </Stack>
  );
};

export default PlanDetails;
