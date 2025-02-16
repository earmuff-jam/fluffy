import * as React from "react";
import { Paper, Stack } from "@mui/material";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import RowHeader from "@utils/RowHeader";
import { pluralizeWord } from "@utils/utility";
import CustomMuiTable from "@common/CustomMuiTable/CustomMuiTable";
import { ASSET_LIST_TABLE_HEADERS } from "@features/assets/contants";
import { SelectedAssetType } from "@features/categories/types";
import { AssetListColumnHeader } from "@utils/types";

interface IItemDetailsContentProps {
  selectedIDList: string[];
  setSelectedIDList: (arrVal: string[]) => void;
  items: Array<SelectedAssetType>;
  handleOpenModal: () => void;
  handleRemoveAssociation: () => void;
  primaryBtnDataTour: string;
  secondaryBtnDataTour: string;
  tableDataTour: string;
}

const ItemDetailsContent: React.FunctionComponent<IItemDetailsContentProps> = ({
  selectedIDList,
  setSelectedIDList,
  items,
  handleOpenModal,
  handleRemoveAssociation,
  primaryBtnDataTour,
  secondaryBtnDataTour,
  tableDataTour,
}) => {
  const handleRowSelection = (_: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    if (id === "all") {
      if (selectedIDList.length !== 0) {
        setSelectedIDList([]);
      } else {
        setSelectedIDList(items.map((v) => v.id));
      }
    } else {
      const selectedIndex = selectedIDList.indexOf(id);
      let draftSelected = [];
      if (selectedIndex === -1) {
        draftSelected = draftSelected.concat(selectedIDList, id);
      } else if (selectedIndex === 0) {
        draftSelected = draftSelected.concat(selectedIDList.slice(1));
      } else if (selectedIndex === selectedIDList.length - 1) {
        draftSelected = draftSelected.concat(selectedIDList.slice(0, -1));
      } else if (selectedIndex > 0) {
        draftSelected = draftSelected.concat(
          selectedIDList.slice(0, selectedIndex),
          selectedIDList.slice(selectedIndex + 1)
        );
      }
      setSelectedIDList(draftSelected);
    }
  };

  const rowFormatter = (
    row: SelectedAssetType,
    columnName: string,
    columnData: AssetListColumnHeader
  ): string | JSX.Element => {
    if (columnData.modifier) {
      return columnData.modifier(row[columnName] || "-");
    } else {
      return row[columnName] || "-";
    }
  };

  return (
    <Paper elevation={1} sx={{ padding: "1rem" }}>
      <Stack spacing={2} data-tour={tableDataTour}>
        <RowHeader
          title="Items"
          caption={`Total ${pluralizeWord("item", items?.length || 0)}`}
          primaryButtonTextLabel="Add"
          primaryStartIcon={<AddRounded />}
          handleClickPrimaryButton={handleOpenModal}
          secondaryButtonTextLabel="Remove"
          secondaryStartIcon={<RemoveRounded color="error" />}
          handleClickSecondaryButton={handleRemoveAssociation}
          secondaryButtonDisabled={selectedIDList.length <= 0}
          primaryBtnDataTour={primaryBtnDataTour}
          secondaryBtnDataTour={secondaryBtnDataTour}
        />
        <CustomMuiTable
          data={items}
          showActions={false}
          rowFormatter={rowFormatter}
          selectedIDList={selectedIDList}
          handleRowSelection={handleRowSelection}
          emptyComponentSubtext="Associate assets."
          columns={Object.values(ASSET_LIST_TABLE_HEADERS).filter(
            (v) => v.displayConcise
          )}
        />
      </Stack>
    </Paper>
  );
};

export default ItemDetailsContent;
