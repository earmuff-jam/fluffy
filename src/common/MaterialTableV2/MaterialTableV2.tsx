import * as React from 'react';

import { AssetType } from '@features/assets/types';

import { MaterialReactTable, MRT_TableInstance } from 'material-react-table';

interface IMaterialTableV2Props {
  table: MRT_TableInstance<AssetType>;
}

const MaterialTableV2: React.FunctionComponent<IMaterialTableV2Props> = ({ table }) => {
  return <MaterialReactTable table={table} />;
};

export default MaterialTableV2;
