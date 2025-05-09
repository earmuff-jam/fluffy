import { useState } from 'react';

import { Paper, Skeleton, Stack } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

import SimpleModal from '@utils/SimpleModal';
import { ConfirmationBoxModal } from '@utils/utils';

import ItemGraph from '@common/ItemDetails/ItemGraph';
import AssociateItem from '@common/ItemDetails/AssociateItem';
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
    const idList = itemsInCategory.filter((item) => selectedIDList.includes(item.assetId.id)).map((item) => item.id);
    await removeAssociationForAssetsFromCategory.mutateAsync({
      categoryId: selectedCategory?.id,
      ids: idList,
    });
    enqueueSnackbar(`Removed association of assets for ${selectedCategory.name}.`, {
      variant: 'default',
    });
    setSelectedIDList([]);
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

  if (loading || Object.keys(selectedCategory).length === 0) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-category-0">
      <ItemDetailsHeader
        categoryMode
        label={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'}
        caption="View details of selected category"
        item={selectedCategory}
        creatorId={selectedCategory?.createdCategoryIdRef}
        image={selectedCategoryImage}
        favBtnDataTour="selected-category-1"
        shareBtnDataTour="selected-category-2"
        imageBtnDataTour="selected-category-3"
      />
      <ItemDetailsContent
        selectedIDList={selectedIDList}
        setSelectedIDList={setSelectedIDList}
        items={itemsInCategory.map((v) => v.assetId)}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={() => setOpenConfirmationBoxModal(!openConfirmationBoxModal)}
        tableDataTour="selected-category-6"
        primaryBtnDataTour="selected-category-4"
        secondaryBtnDataTour="selected-category-5"
      />
      <Paper elevation={1} sx={{ padding: '1rem' }} data-tour="selected-category-7">
        <ItemGraph associatedAssets={itemsInCategory.map((v) => v.assetId)} />
      </Paper>
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedCategory?.name}`} handleClose={resetSelection} maxSize="md">
          <AssociateItem
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
