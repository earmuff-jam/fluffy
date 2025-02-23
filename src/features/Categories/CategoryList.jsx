import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import SimpleModal from '@common/SimpleModal';
import AddCategory from '@features/Categories/AddCategory';
import SectionCardHeader from '@common/SectionCard/SectionCardHeader';
import SectionCardContent from '@common/SectionCard/SectionCardContent';
import { useCategories, useDownloadCategories, useRemoveCategory } from '@services/categoriesApi';
import dayjs from 'dayjs';

const CategoryList = ({ displayConcise = false }) => {
  const { data: categories, isLoading } = useCategories();
  const { mutate: removeCategory } = useRemoveCategory();
  const { mutate: downloadCategories } = useDownloadCategories();

  const [sortedData, setSortedData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(true); // false ascending

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedCategoryID('');
  };

  const filterAndBuildCategories = (displayConcise, categories, selectedFilter) => {
    if (displayConcise) {
      return categories?.slice(0, 4);
    } else if (selectedFilter.length > 0) {
      return categories.filter((element) => element.status_name === selectedFilter);
    } else {
      return sortedData;
    }
  };

  useEffect(() => {
    if (sortingOrder && categories?.length > 0) {
      const draft = [...categories].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setSortedData(draft);
    } else {
      setSortedData(categories);
    }
  }, [sortingOrder, categories]);

  return (
    <Stack sx={{ py: 2 }} data-tour="categories-0">
      <SectionCardHeader
        title="Categories"
        caption={selectedFilter ? `Applying ${selectedFilter} status filter` : 'Organize items into categories'}
        primaryBtnTitle="Add category"
        toggleModal={() => setDisplayModal(!displayModal)}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        handleDownload={() => downloadCategories()}
        addBtnDataTour={'categories-1'}
        downloadBtnDataTour={'categories-2'}
        filterBtnDataTour={'categories-3'}
        sortBtnDataTour={'categories-4'}
        disableDownloadIcon={!categories || (Boolean(categories) && categories.length <= 0)}
      />
      <SectionCardContent
        loading={isLoading}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        setSelectedID={setSelectedCategoryID}
        removeItem={(id) => removeCategory(id)}
        prefixURI={'category'}
        content={filterAndBuildCategories(displayConcise, categories, selectedFilter)}
      />
      {displayModal && (
        <SimpleModal
          title="Add new category"
          subtitle="Create categories to group assets. Assigned locations are approximate values."
          handleClose={handleClose}
          maxSize="sm"
        >
          <AddCategory
            categories={categories}
            loading={isLoading}
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
