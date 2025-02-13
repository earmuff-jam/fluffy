import FilterAndSortMenu from "@common/FilterAndSortMenu/FilterAndSortMenu";
import SectionCardHeaderButton from "@common/SectionCard/SectionCardHeaderButton";
import { Stack } from "@mui/material";
import RowHeader from "@utils/RowHeader";
import * as React from "react";

interface ISectionCardHeaderProps {
  title: string;
  caption: string;
  primaryBtnTitle: string;
  toggleModal: () => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  sortingOrder: boolean;
  setSortingOrder: (value: boolean) => void;
  handleDownload: () => void;
  disableDownloadIcon: boolean;
  addBtnDataTour: string;
  downloadBtnDataTour: string;
  filterBtnDataTour: string;
  sortBtnDataTour: string;
}

const SectionCardHeader: React.FunctionComponent<ISectionCardHeaderProps> = ({
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
}) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader title={title} caption={caption} />
        <SectionCardHeaderButton
          title={primaryBtnTitle}
          handleButtonClick={toggleModal}
          handleIconButtonClick={handleDownload}
          disableDownloadIcon={disableDownloadIcon}
          addBtnDataTour={addBtnDataTour}
          downloadBtnDataTour={downloadBtnDataTour}
        />
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
};

export default SectionCardHeader;
