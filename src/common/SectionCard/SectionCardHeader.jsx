import { AddRounded, FileDownload } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import FilterAndSortMenu from '@common/SectionCard/FilterAndSortMenu';

export default function SectionCardHeader({
  title,
  caption,
  primaryBtnTitle,
  toggleModal,
  selectedFilter,
  setSelectedFilter,
  sortingOrder,
  setSortingOrder,
  handleDownload,
  disableDownloadIcon,
  addBtnDataTour,
  downloadBtnDataTour,
  filterBtnDataTour,
  sortBtnDataTour,
  isSecondaryButtonLoading,
}) {
  return (
    <>
      <RowHeader
        title={title}
        caption={caption}
        primaryStartIcon={<AddRounded />}
        primaryButtonTextLabel={primaryBtnTitle}
        handleClickPrimaryButton={toggleModal}
        secondaryStartIcon={<FileDownload />}
        secondaryButtonTextLabel={'Export'}
        primaryBtnDataTour={addBtnDataTour}
        secondaryBtnDataTour={downloadBtnDataTour}
        secondaryButtonDisabled={disableDownloadIcon}
        isSecondaryButtonLoading={isSecondaryButtonLoading}
        handleClickSecondaryButton={handleDownload}
      />
      <FilterAndSortMenu
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filterBtnDataTour={filterBtnDataTour}
        sortBtnDataTour={sortBtnDataTour}
      />
    </>
  );
}
