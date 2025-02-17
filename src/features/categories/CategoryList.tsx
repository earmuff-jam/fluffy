import * as React from "react";

import { Stack } from "@mui/material";
import SimpleModal from "@utils/SimpleModal";
import AddCategory from "@features/categories/AddCategory";
import SectionCardHeader from "@common/SectionCard/SectionCardHeader";
import SectionCardContent from "@common/SectionCard/SectionCardContent";
import { CategoryType } from "@features/categories/types";

const CategoryList: React.FunctionComponent = () => {
  const categories = [];
  const loading = false;

  const [sortedData, setSortedData] = React.useState([]);
  const [sortingOrder, setSortingOrder] = React.useState(true); // false ascending

  const [displayModal, setDisplayModal] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [selectedCategoryID, setSelectedCategoryID] = React.useState("");

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedCategoryID("");
  };

  const toggleModal = () => setDisplayModal(!displayModal);
  const handleDownload = () => {};
  const removeSelectedCategory = () => {};
  // const handleDownload = () => dispatch(categoryActions.download());
  // const removeSelectedCategory = (id) => dispatch(categoryActions.removeCategory({ id }));

  const filterAndBuildCategories = (
    displayConcise: boolean,
    categories: Array<CategoryType>,
    selectedFilter: string
  ): Array<CategoryType> => {
    if (displayConcise) {
      return categories?.slice(0, 4);
    } else if (selectedFilter.length > 0) {
      return categories.filter((element) => element.status === selectedFilter);
    } else {
      return sortedData;
    }
  };

  // React.useEffect(() => {
  //   if (sortingOrder) {
  //     if (categories && categories.length > 0) {
  //       const draft = [...categories].sort(
  //         (a, b) =>
  //           new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  //       );
  //       setSortedData(draft);
  //     } else {
  //       setSortedData(categories);
  //     }
  //   } else {
  //     setSortedData(categories);
  //   }
  // }, [sortingOrder, categories]);

  React.useEffect(() => {
    //   dispatch(categoryActions.getCategories(100));
  }, []);

  return (
    <Stack sx={{ py: 2 }} data-tour="categories-0">
      <SectionCardHeader
        title="Categories"
        caption={
          selectedFilter
            ? `Applying ${selectedFilter} status filter`
            : "Organize items into categories"
        }
        primaryBtnTitle="Add category"
        toggleModal={toggleModal}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        handleDownload={handleDownload}
        addBtnDataTour={"categories-1"}
        downloadBtnDataTour={"categories-2"}
        filterBtnDataTour={"categories-3"}
        sortBtnDataTour={"categories-4"}
        disableDownloadIcon={Boolean(categories) && categories.length <= 0}
      />
      <SectionCardContent
        loading={loading}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        setSelectedID={setSelectedCategoryID}
        removeItem={removeSelectedCategory}
        prefixURI={"category"}
        content={filterAndBuildCategories(false, categories, selectedFilter)}
      />
      {displayModal && (
        <SimpleModal
          title="Add new category"
          subtitle="Create categories to group assets. Assigned locations are approximate values."
          handleClose={handleClose}
          maxSize="sm"
        >
          <AddCategory
            loading={loading}
            categories={categories}
            handleCloseAddCategory={handleClose}
            selectedCategoryID={selectedCategoryID}
            setSelectedCategoryID={setSelectedCategoryID}
          />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default CategoryList;
