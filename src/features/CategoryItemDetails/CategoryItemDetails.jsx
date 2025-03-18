import { useState } from 'react';

import { Paper, Skeleton, Stack } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

import SimpleModal from '@utils/SimpleModal';
import { ConfirmationBoxModal } from '@utils/utils';

import AddItem from '@common/ItemDetails/AddItem';
import ItemGraph from '@common/ItemDetails/ItemGraph';
import ItemDetailsHeader from '@common/ItemDetails/ItemDetailsHeader';
import ItemDetailsContent from '@common/ItemDetails/ItemDetailsContent';

import {
  useCreateAssociationForItemsWithCategory,
  useFetchAssetsAssociatedWithCategoryById,
  useFetchCategoryById,
  useFetchCategoryPhoto,
  useRemoveAssociationForAssetsWithCategory,
} from '@services/categoriesApi';

export default function CategoryItemDetails() {
  const { id } = useParams();

  const { data: selectedCategory = {}, isLoading: loading } = useFetchCategoryById(id);
  const { data: itemsInCategory = [] } = useFetchAssetsAssociatedWithCategoryById(id);

  const { data: selectedCategoryImage } = useFetchCategoryPhoto(selectedCategory?.imageURL);

  const createAssociationForAssetsWithCategory = useCreateAssociationForItemsWithCategory();
  const removeAssociationForAssetsFromCategory = useRemoveAssociationForAssetsWithCategory();

  const [rowSelection, setRowSelection] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [openConfirmationBoxModal, setOpenConfirmationBoxModal] = useState(false);

  const handleOpenModal = () => setDisplayModal(true);
  const resetConfirmationBoxModal = () => setOpenConfirmationBoxModal(false);

  const resetSelection = () => {
    setDisplayModal(false);
    setRowSelection([]);
  };

  const confirmDelete = async () => {
    const idList = itemsInCategory.filter((item) => rowSelection.includes(item.assetId.id)).map((item) => item.id);
    await removeAssociationForAssetsFromCategory.mutateAsync({
      categoryId: selectedCategory?.id,
      ids: idList,
    });
    enqueueSnackbar(`Removed association of assets for ${selectedCategory.name}.`, {
      variant: 'default',
    });
    setRowSelection([]);
    resetConfirmationBoxModal();
  };

  const addItems = async (selectedIDList) => {
    await createAssociationForAssetsWithCategory.mutateAsync({
      categoryId: selectedCategory?.id,
      assetIds: selectedIDList,
    });
    enqueueSnackbar(`Added association of assets for ${selectedCategory.name}.`, {
      variant: 'success',
    });
    resetSelection();
  };

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-category-0">
      <ItemDetailsHeader
        categoryMode
        label={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'}
        caption="View details of selected category"
        item={selectedCategory}
        image={selectedCategoryImage}
        favBtnDataTour="selected-category-1"
        shareBtnDataTour="selected-category-2"
        imageBtnDataTour="selected-category-3"
      />
      <ItemDetailsContent
        associatedItems={itemsInCategory.map((v) => v.assetId)}
        removeAssociation={() => setOpenConfirmationBoxModal(!openConfirmationBoxModal)}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        handleOpenModal={handleOpenModal}
        tableDataTour="selected-category-5"
        primaryBtnDataTour="selected-category-4"
      />
      <Paper elevation={1} sx={{ padding: '1rem' }} data-tour="selected-category-6">
        <ItemGraph associatedAssets={itemsInCategory.map((v) => v.assetId)} />
      </Paper>
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedCategory?.name}`} handleClose={resetSelection} maxSize="md">
          <AddItem
            addItems={addItems}
            itemTitle={selectedCategory?.name}
            associatedItems={itemsInCategory.map((v) => v.assetId)}
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
