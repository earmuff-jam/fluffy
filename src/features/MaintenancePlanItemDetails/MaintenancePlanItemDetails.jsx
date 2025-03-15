import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

import SimpleModal from '@common/SimpleModal';
import { Skeleton, Stack } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import { ConfirmationBoxModal } from '@common/utils';
import AddItem from '@common/ItemCard/AddItem/AddItem';
import ItemHeader from '@common/ItemCard/ItemHeader/ItemHeader';
import ItemContent from '@common/ItemCard/ItemContent/ItemContent';
import ItemGraphWrapper from '@common/ItemCard/ItemGraph/ItemGraphWrapper';

import {
  useCreateAssociationForItemsWithMaintenancePlan,
  useFetchAssetsAssociatedWithMaintenancePlanById,
  useFetchMaintenancePlanById,
  useFetchMaintenancePlanPhoto,
  useRemoveAssociationForAssetsWithMaintenancePlan,
} from '@services/maintenancePlanApi';

export default function MaintenancePlanItemDetails() {
  const { id } = useParams();

  const { data: selectedMaintenancePlan = {}, isLoading: loading } = useFetchMaintenancePlanById(id);

  const { data: itemsInMaintenancePlan = [] } = useFetchAssetsAssociatedWithMaintenancePlanById(id);

  const { data: selectedMaintenancePlanImage } = useFetchMaintenancePlanPhoto(selectedMaintenancePlan?.imageURL);

  const createAssociationForAssetsWithMaintenancePlan = useCreateAssociationForItemsWithMaintenancePlan();
  const removeAssociationForAssetsFromMaintenancePlan = useRemoveAssociationForAssetsWithMaintenancePlan();

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedIDList, setSelectedIDList] = useState([]);
  const [openConfirmationBoxModal, setOpenConfirmationBoxModal] = useState(false);

  const handleOpenModal = () => setDisplayModal(true);
  const resetConfirmationBoxModal = () => setOpenConfirmationBoxModal(false);

  const resetSelection = () => {
    setDisplayModal(false);
    setSelectedIDList([]);
  };

  const confirmDelete = async () => {
    const idList = itemsInMaintenancePlan
      .filter((item) => selectedIDList.includes(item.assetId.id))
      .map((item) => item.id);
    await removeAssociationForAssetsFromMaintenancePlan.mutateAsync({
      maintenancePlanId: selectedMaintenancePlan?.id,
      ids: idList,
    });
    enqueueSnackbar(`Removed association of assets for ${selectedMaintenancePlan.name}.`, {
      variant: 'default',
    });
    setSelectedIDList([]);
    resetConfirmationBoxModal();
  };

  const addItems = async (selectedIDList) => {
    await createAssociationForAssetsWithMaintenancePlan.mutateAsync({
      maintenancePlanId: selectedMaintenancePlan?.id,
      assetIds: selectedIDList,
    });
    enqueueSnackbar(`Added association of assets for ${selectedMaintenancePlan.name}.`, {
      variant: 'success',
    });
    resetSelection();
  };

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-plan-0">
      <ItemHeader
        label={selectedMaintenancePlan?.name ? `${selectedMaintenancePlan.name} Overview` : 'Maintenance Plan Overview'}
        caption="View details of selected maintenance plan"
        item={selectedMaintenancePlan}
        image={selectedMaintenancePlanImage}
        favBtnDataTour="selected-plan-1"
        shareBtnDataTour="selected-plan-2"
        imageBtnDataTour="selected-plan-3"
      />
      <ItemContent
        selectedIDList={selectedIDList}
        setSelectedIDList={setSelectedIDList}
        items={itemsInMaintenancePlan.map((v) => v.assetId)}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={() => setOpenConfirmationBoxModal(!openConfirmationBoxModal)}
        tableDataTour="selected-plan-6"
        primaryBtnDataTour="selected-plan-4"
        secondaryBtnDataTour="selected-plan-5"
      />
      <ItemGraphWrapper
        associatedAssets={itemsInMaintenancePlan.map((v) => v.assetId)}
        graphDataTour="selected-plan-7"
      />
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedMaintenancePlan?.name}`} handleClose={resetSelection}>
          <AddItem
            addItems={addItems}
            itemTitle={selectedMaintenancePlan?.name}
            associatedItems={itemsInMaintenancePlan.map((v) => v.assetId)}
          />
        </SimpleModal>
      )}
      <ConfirmationBoxModal
        openDialog={openConfirmationBoxModal}
        title="Confirm deletion"
        handleClose={resetConfirmationBoxModal}
        maxSize="xs"
        confirmDelete={confirmDelete}
      />
    </Stack>
  );
}
