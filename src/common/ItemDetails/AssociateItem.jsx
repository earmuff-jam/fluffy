import { useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';

import { useFetchAssets } from '@services/assetsApi';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { ASSETS_LIST_HEADERS } from '@features/Assets/constants';

import { EmptyComponent } from '@utils/utils';
import DataTable from '@common/DataTable/DataTable';
import { useMaterialReactTable } from 'material-react-table';

export default function AddItem({ itemTitle, addItems, associatedItems }) {
  const { user } = useAuthenticator();
  const { data: assets = [], isLoading } = useFetchAssets(user?.userId);

  const [rowSelection, setRowSelection] = useState([]);

  const columns = useMemo(() => ASSETS_LIST_HEADERS, []);

  const itemsWithoutAssociation = useMemo(() => {
    const associatedItemsId = associatedItems?.map((aItems) => aItems.id);
    return assets.filter((asset) => !associatedItemsId.includes(asset.id));
  }, [assets, associatedItems]);

  const handleAddAssets = (table) => {
    const selectedRows = table.getSelectedRowModel().rows.map((v) => v.original.id);
    addItems(selectedRows);
  };

  const table = useMaterialReactTable({
    columns,
    data: itemsWithoutAssociation,
    enableSorting: true,
    enableFilters: true,
    enableFullScreenToggle: false,
    enableTopToolbar: true,
    enableRowSelection: true,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enablePagination: itemsWithoutAssociation.length > 0,
    initialState: {
      density: 'comfortable',
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiTableHeadRowProps: {
      sx: { padding: '1rem' },
    },
    muiTableBodyRowProps: {
      sx: { padding: '0.2rem' },
    },
    renderEmptyRowsFallback: () => (
      <EmptyComponent padding="1rem 1rem" subtitle={`Add assets to associated them with ${itemTitle}.`} />
    ),
    onRowSelectionChange: setRowSelection,
    state: {
      isLoading: isLoading,
      rowSelection: rowSelection,
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const isSomeRowsSelected = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();
      return isSomeRowsSelected ? (
        <Button variant="outlined" onClick={() => handleAddAssets(table)}>
          Associate Items
        </Button>
      ) : null;
    },
  });

  return (
    <Stack spacing={1}>
      <DataTable table={table} />
    </Stack>
  );
}
