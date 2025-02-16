import * as React from "react";

import { TableBody, TableCell, TableRow } from "@mui/material";
import CustomMuiTableCellCheckbox from "@common/CustomMuiTable/CustomMuiTableCellCheckbox";
import CustomMuiTableButtonActions from "@common/CustomMuiTable/CustomMuiTableButtonActions";
import { AssetListColumnHeader } from "@utils/types";
import { SelectedAssetType } from "@features/categories/types";

interface ICustomTableBodyProps {
  data: any[];
  columns: AssetListColumnHeader[];
  selectedIDList: string[];
  hideCheckBox?: boolean;
  handleRowSelection: (
    ev: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  rowFormatter: (row: SelectedAssetType, colName: string, column: AssetListColumnHeader) => string | JSX.Element;
  showActions?: boolean;
  handleEdit: (row: any) => void;
  onRowSelect: (value: SelectedAssetType) => void;
  hideIconButton?: boolean;
  hideMoreDetailsButton?: boolean;
}

const CustomTableBody: React.FunctionComponent<ICustomTableBodyProps> = ({
  data,
  columns,
  selectedIDList,
  hideCheckBox = false,
  handleRowSelection,
  rowFormatter,
  showActions = false,
  handleEdit,
  onRowSelect,
  hideIconButton = false,
  hideMoreDetailsButton = false,
}) => {
  return (
    <TableBody>
      {data.map((row) => {
        const isSelected = (id: string) => selectedIDList.includes(id);
        const selectedID = row.id;
        const isItemSelected = isSelected(selectedID);
        return (
          <TableRow hover key={row.id}>
            {!hideCheckBox && (
              <CustomMuiTableCellCheckbox
                selectedID={selectedID}
                isItemSelected={isItemSelected}
                handleRowSelection={handleRowSelection}
              />
            )}
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id} size="small">
                  {rowFormatter(row, column.colName, column)}
                </TableCell>
              );
            })}
            {showActions && (
              <CustomMuiTableButtonActions
                row={row}
                selectedID={selectedID}
                handleEdit={handleEdit}
                onRowSelect={onRowSelect}
                hideIconButton={hideIconButton}
                hideMoreDetailsButton={hideMoreDetailsButton}
              />
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CustomTableBody;
