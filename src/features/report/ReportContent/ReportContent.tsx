import * as React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Stack } from '@mui/material';

import { MRT_TableInstance, useMaterialReactTable } from 'material-react-table';
import EmptyComponent from '@utils/EmptyComponent';
import RowHeader from '@utils/RowHeader';
import { AssetType } from '@features/assets/types';
import MaterialTableV2 from '@common/MaterialTableV2/MaterialTableV2';
import { ASSETS_IN_REPORTS_HEADER } from '@features/report/constants';

dayjs.extend(relativeTime);

interface IReportContentProps {
  sinceValue: string;
  assets: Array<AssetType>;
}

const ReportContent: React.FunctionComponent<IReportContentProps> = ({ sinceValue, assets = [] }) => {
  const columns = React.useMemo(() => ASSETS_IN_REPORTS_HEADER, []);

  const table: MRT_TableInstance<AssetType> = useMaterialReactTable({
    columns,
    data: assets,
    enableSorting: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableTopToolbar: false,
    muiTableHeadRowProps: {
      sx: { padding: '1rem' },
    },
    muiTableBodyRowProps: {
      sx: { padding: '0.2rem' },
    },
    enableColumnResizing: true,
    enableDensityToggle: false,
    initialState: { density: 'compact' },
    renderEmptyRowsFallback: () => <EmptyComponent padding="1rem 1rem" />,
  });

  return (
    <Stack data-tour={'reports-7'}>
      <RowHeader title="Asset Details" caption={`Asset movement since ${dayjs(sinceValue).fromNow()}`} />
      <MaterialTableV2 table={table} />
    </Stack>
  );
};

export default ReportContent;
