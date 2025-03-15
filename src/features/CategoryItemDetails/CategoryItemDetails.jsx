import { useState } from 'react';

import { Skeleton, Stack } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

import SimpleModal from '@common/SimpleModal';
import { ConfirmationBoxModal } from '@common/utils';

import AddItem from '@common/ItemCard/AddItem/AddItem';
import ItemHeader from '@common/ItemCard/ItemHeader/ItemHeader';
import ItemContent from '@common/ItemCard/ItemContent/ItemContent';
import ItemGraphWrapper from '@common/ItemCard/ItemGraph/ItemGraphWrapper';

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

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-category-0">
      <ItemHeader
        categoryMode
        label={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'}
        caption="View details of selected category"
        item={selectedCategory}
        image={selectedCategoryImage}
        favBtnDataTour="selected-category-1"
        shareBtnDataTour="selected-category-2"
        imageBtnDataTour="selected-category-3"
      />
      <ItemContent
        selectedIDList={selectedIDList}
        setSelectedIDList={setSelectedIDList}
        items={itemsInCategory.map((v) => v.assetId)}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={() => setOpenConfirmationBoxModal(!openConfirmationBoxModal)}
        tableDataTour="selected-category-6"
        primaryBtnDataTour="selected-category-4"
        secondaryBtnDataTour="selected-category-5"
      />
      <ItemGraphWrapper associatedAssets={itemsInCategory.map((v) => v.assetId)} graphDataTour="selected-category-7" />
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
