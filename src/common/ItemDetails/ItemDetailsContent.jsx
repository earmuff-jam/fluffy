import { Paper, Stack } from '@mui/material';

import { AddRounded, RemoveRounded } from '@mui/icons-material';

import { pluralizeWord } from '@utils/utils';
import { ASSET_LIST_HEADERS } from '@features/Assets/constants';

import RowHeader from '@utils/RowHeader';
import TableComponent from '@common/DataTable/CustomTableComponent/TableComponent';

export default function ItemDetailsContent({
  selectedIDList,
  setSelectedIDList,
  items,
  handleOpenModal,
  handleRemoveAssociation,
  primaryBtnDataTour,
  secondaryBtnDataTour,
  tableDataTour,
}) {
  const rowFormatter = (row, columnName, column) => column.modifier(row[columnName] || '-');

  const handleRowSelection = (_, id) => {
    if (id === 'all') {
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

  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <Stack spacing={2} data-tour={tableDataTour}>
        <RowHeader
          title="Items"
          caption={`Total ${pluralizeWord('item', items?.length || 0)}`}
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
        <TableComponent
          showActions={false}
          data={items}
          columns={Object.values(ASSET_LIST_HEADERS).filter((v) => v.displayConcise)}
          rowFormatter={rowFormatter}
          selectedIDList={selectedIDList}
          handleRowSelection={handleRowSelection}
          emptyComponentSubtext="Associate assets."
        />
      </Stack>
    </Paper>
  );
}
