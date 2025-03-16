import { useMemo } from 'react';

import { Stack } from '@mui/material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import RowHeader from '@utils/RowHeader';
import { EmptyComponent } from '@utils/utils';
import DataTable from '@common/DataTable/DataTable';

import { useMaterialReactTable } from 'material-react-table';
import { ASSETS_LIST_HEADERS } from '@features/Assets/constants';

dayjs.extend(relativeTime);

export default function ReportContent({ sinceValue, assets }) {
  const columns = useMemo(() => ASSETS_LIST_HEADERS, []);

  const table = useMaterialReactTable({
    columns,
    data: assets,
    enableSorting: true,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableTopToolbar: false,
    enableColumnResizing: false,
    enableDensityToggle: false,
    initialState: { density: 'comfortable' },
    muiTableHeadRowProps: {
      sx: { padding: '1rem' },
    },
    muiTableBodyRowProps: {
      sx: { padding: '0.2rem' },
    },
    renderEmptyRowsFallback: () => <EmptyComponent padding="1rem 1rem" />,
  });

  return (
    <Stack data-tour={'reports-7'}>
      <RowHeader title="Asset Details" caption={`Asset movement since ${dayjs(sinceValue).fromNow()}`} />
      <DataTable table={table} />
    </Stack>
  );
}
