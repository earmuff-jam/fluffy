import { Stack } from '@mui/material';

import { ASSET_LIST_HEADERS } from '@features/Assets/constants';

import TableComponent from '@common/DataTable/CustomTableComponent/TableComponent';

import { useFetchAssets } from '@services/assetsApi';

import { useAuthenticator } from '@aws-amplify/ui-react';

export default function AddItem({ selectedIDList, setSelectedIDList, associatedItems }) {
  const { user } = useAuthenticator();
  const { data: assets = [], isLoading } = useFetchAssets(user.userId);

  const rowFormatter = (row, columnName, column) => column.modifier(row[columnName] || '-');

  const handleRowSelection = (_, id) => {
    if (id === 'all') {
      if (selectedIDList.length !== 0) {
        setSelectedIDList([]);
      } else {
        setSelectedIDList(assets.map((v) => v.id));
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
    <Stack spacing={1}>
      <TableComponent
        paper
        showActions={false}
        isLoading={isLoading}
        data={assets.filter((asset) => !associatedItems?.some((item) => item.id === asset.id))}
        columns={Object.values(ASSET_LIST_HEADERS).filter((v) => v.displayConcise)}
        rowFormatter={rowFormatter}
        selectedIDList={selectedIDList}
        handleRowSelection={handleRowSelection}
        emptyComponentSubtext="Add assets to associated them with selected plan."
      />
    </Stack>
  );
}
