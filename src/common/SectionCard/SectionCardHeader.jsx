import { Button, IconButton, Stack } from '@mui/material';
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
}) {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader title={title} caption={caption} />
        <Stack direction="row" spacing={1}>
          <Button onClick={toggleModal} startIcon={<AddRounded />} variant="outlined" data-tour={addBtnDataTour}>
            {primaryBtnTitle}
          </Button>
          <IconButton
            size="small"
            onClick={handleDownload}
            disabled={disableDownloadIcon}
            data-tour={downloadBtnDataTour}
          >
            <FileDownload fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
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
