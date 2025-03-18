import { useMemo } from 'react';

import { Button, Paper, Stack } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import RowHeader from '@utils/RowHeader';
import { EmptyComponent, pluralizeWord } from '@utils/utils';
import { ASSETS_LIST_HEADERS } from '@features/Assets/constants';

import DataTable from '@common/DataTable/DataTable';
import { useMaterialReactTable } from 'material-react-table';

export default function ItemDetailsContent({
  rowSelection,
  setRowSelection,
  associatedItems,
  handleOpenModal,
  removeAssociation,
  primaryBtnDataTour,
  tableDataTour,
}) {
  const columns = useMemo(() => ASSETS_LIST_HEADERS, []);

  const handleRemoveAssociations = (table) => {
    const selectedRows = table.getSelectedRowModel().rows.map((v) => v.original.id);
    setRowSelection(selectedRows);
    removeAssociation();
  };

  const table = useMaterialReactTable({
    columns,
    data: associatedItems || [],
    enableSorting: true,
    enableFilters: true,
    enableFullScreenToggle: false,
    enableRowSelection: true,
    enableTopToolbar: true,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enablePagination: associatedItems?.length > 0,
    initialState: {
      density: 'comfortable',
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    muiTableHeadRowProps: {
      sx: { padding: '1rem' },
    },
    muiTableBodyRowProps: {
      sx: { padding: '0.2rem' },
    },
    renderEmptyRowsFallback: () => <EmptyComponent padding="1rem 1rem" subtitle="Associate assets." />,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection: rowSelection,
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const isSomeRowsSelected = table?.getIsSomeRowsSelected() || table?.getIsAllRowsSelected();
      return isSomeRowsSelected ? (
        <Button variant="outlined" onClick={() => handleRemoveAssociations(table)}>
          Remove assets
        </Button>
      ) : null;
    },
  });

  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <Stack spacing={2} data-tour={tableDataTour}>
        <RowHeader
          title="Associated Items"
          caption={`Total ${pluralizeWord('item', associatedItems?.length || 0)}`}
          primaryButtonTextLabel="Add"
          primaryStartIcon={<AddRounded />}
          handleClickPrimaryButton={handleOpenModal}
          primaryBtnDataTour={primaryBtnDataTour}
        />
        <DataTable table={table} />
      </Stack>
    </Paper>
  );
}
