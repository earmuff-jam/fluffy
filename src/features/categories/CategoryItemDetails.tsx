import * as React from "react";

import { Skeleton, Stack } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import CustomSnackbar from "@utils/Snackbar";
import { SnackbarContent } from "@utils/types";
import SimpleModal from "@utils/SimpleModal";
import ConfirmationBox from "@utils/ConfirmationBox";
import ItemDetailsHeader from "@features/selected/ItemDetailsHeader";
import { SelectedAssetType } from "@features/categories/types";
import { LocationType } from "@utils/types";
import ItemDetailsContent from "@features/selected/ItemDetailsContent";
import ItemGraphWrapper from "@features/selected/ItemGraph/ItemGraphWrapper";

const CategoryItemDetails: React.FunctionComponent = () => {
  const selectedCategory: SelectedAssetType = {
    id: "",
    name: "",
    description: "",
    color: "",
    image: "",
    status: "",
    min_items_limit: 0,
    max_items_limit: 0,
    location: {} as LocationType,
    maintenance_status_name: "",
    created_at: "",
    created_by: "",
    updated_at: "",
    updator: "",
    updated_by: "",
    sharable_groups: [],
  };

  const itemsInCategory: SelectedAssetType[] = []; 
  
  const selectedCategoryImage = "";
  const loading = false;

  const [displayModal, setDisplayModal] = React.useState<boolean>(false);

  const [selectedIDList, setSelectedIDList] = React.useState<string[]>([]);

  const [openConfirmationBoxModal, setOpenConfirmationBoxModal] =
    React.useState<boolean>(false);

  const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
    {
      open: false,
      message: null,
      severity: "success",
    }
  );

  const handleOpenModal = () => {
    setDisplayModal(true);
    // dispatch(inventoryActions.getAllInventoriesForUser());
  };

  const handleOpenConfirmationBoxModal = () =>
    setOpenConfirmationBoxModal(!openConfirmationBoxModal);

  const resetSelection = () => {
    setDisplayModal(false);
    setSelectedIDList([]);
  };

  const resetConfirmationBoxModal = () => setOpenConfirmationBoxModal(false);

  const confirmDelete = (selectedCategoryID: string): void => {
    // dispatch(categoryItemDetailsActions.removeItemsFromCategory({ id: selectedCategory?.id, selectedIDList }));
    setSelectedIDList([]);
    resetConfirmationBoxModal();
    setSnackbarContent({
      open: true,
      message: `Removed association of assets for ${selectedCategory.name}.`,
      severity: "info",
    });
  };

  const addItems = () => {
    // const collaborators = selectedCategory.sharable_groups;
    // dispatch(
    //     categoryItemDetailsActions.addItemsInCategory({ id: selectedCategory?.id, selectedIDList, collaborators })
    // );
    resetSelection();
    setSnackbarContent({
      open: true,
      message: `Added association of assets for ${selectedCategory.name}.`,
      severity: "success",
    });
  };

  const handleRemoveAssociation = () => {
    handleOpenConfirmationBoxModal();
  };

  // React.useEffect(() => {
  //     if (!loading) {
  //         // dispatch(categoryItemDetailsActions.getSelectedImage({ id }));
  //     }
  // }, [loading]);

  // React.useEffect(() => {
  //     if (id) {
  //         // dispatch(categoryItemDetailsActions.getCategory(id));
  //         // dispatch(categoryItemDetailsActions.getItemsForCategory(id));
  //     }
  // }, [id]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack spacing={3} data-tour="selected-category-0">
      <ItemDetailsHeader
        categoryMode
        label={
          selectedCategory?.name
            ? `${selectedCategory.name} Overview`
            : "Category Overview"
        }
        caption="View details of selected category"
        item={selectedCategory}
        image={selectedCategoryImage}
        favBtnDataTour="selected-category-1"
        shareBtnDataTour="selected-category-2"
        imageBtnDataTour="selected-category-3"
      />
      <ItemDetailsContent
        selectedIDList={selectedIDList}
        setSelectedIDList={setSelectedIDList}
        items={itemsInCategory}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={handleRemoveAssociation}
        tableDataTour="selected-category-6"
        primaryBtnDataTour="selected-category-4"
        secondaryBtnDataTour="selected-category-5"
      />
      <ItemGraphWrapper
        associatedAssets={itemsInCategory}
        graphDataTour="selected-category-7"
      />
      {displayModal && (
        <SimpleModal
          title={`Add items to ${selectedCategory?.name}`}
          handleClose={resetSelection}
          showSecondaryButton
          secondaryButtonAction={addItems}
          disableSecondaryButton={selectedIDList.length <= 0}
          secondaryButtonIcon={<AddRounded />}
          maxSize="md"
        >
          <AddItem
            selectedIDList={selectedIDList}
            setSelectedIDList={setSelectedIDList}
            resetSelection={resetSelection}
            associatedItems={itemsInCategory}
          />
        </SimpleModal>
      )}
      {openConfirmationBoxModal && (
        <ConfirmationBox
          title="Confirm deletion"
          handleClose={resetConfirmationBoxModal}
          maxSize="xs"
          deleteID={selectedCategory.id}
          confirmDelete={confirmDelete}
        />
      )}
      <CustomSnackbar
        open={snackbarContent.open}
        message={snackbarContent.message}
        severity={snackbarContent.severity}
        handleClose={() =>
          setSnackbarContent({
            open: false,
            severity: "success",
            message: null,
          })
        }
      />
    </Stack>
  );
};

export default CategoryItemDetails;
