import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Stack } from '@mui/material';

import { produce } from 'immer';
import { buildXcel } from '@utils/utils';
import { CATEGORY_COLUMN_HEADERS } from '@features/Categories/constants';

import SimpleModal from '@utils/SimpleModal';
import AddCategory from '@features/Categories/AddCategory';
import SectionCardHeader from '@common/SectionCard/SectionCardHeader';
import SectionCardContent from '@common/SectionCard/SectionCardContent';

import { useFetchAllCategories, useDownloadCategories, useRemoveCategory } from '@services/categoriesApi';

const CategoryList = ({ displayConcise = false }) => {
  const { data: categories, isLoading } = useFetchAllCategories();

  const { mutate: removeCategory } = useRemoveCategory();
  const {
    mutate: downloadCategories,
    data: downloadedCategories = [],
    isLoading: isCategoriesDownloading,
    reset,
  } = useDownloadCategories();

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
      return categories.filter((element) => element.status === selectedFilter);
    } else {
      return sortedData;
    }
  };

  useEffect(() => {
    if (downloadedCategories.length > 0) {
      const formattedCategories = produce(downloadedCategories, (draft) => {
        draft.forEach((categoryItem, index) => {
          draft[index] = Object.fromEntries(
            Object.values(CATEGORY_COLUMN_HEADERS)
              .sort((a, b) => a.id - b.id) // Ensure order
              .map(({ label, colName, modifier }) => [
                label,
                modifier && colName !== 'updatedAt' ? modifier(categoryItem[colName]) : categoryItem[colName] || '-',
              ])
          );
        });
      });

      buildXcel(
        Object.values(CATEGORY_COLUMN_HEADERS).map((header) => header.label),
        formattedCategories,
        'categories.xlsx',
        `categories-${dayjs().format('DD-MM-YYYY')}`
      );

      reset();
    }
  }, [downloadedCategories, reset]);

  useEffect(() => {
    if (categories?.length > 0) {
      const draft = [...categories].sort((a, b) => {
        return sortingOrder
          ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() // Descending
          : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(); // Ascending
      });
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
        isSecondaryButtonLoading={isCategoriesDownloading}
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
        emptyComponentSubtext="Add categories"
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
