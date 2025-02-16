import * as React from "react";
import { Checkbox, Stack, TableCell } from "@mui/material";

interface ICustomMuiTableCellCheckboxProps {
  selectedID: string;
  isItemSelected: boolean;
  handleRowSelection: (
    ev: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

const CustomMuiTableCellCheckbox: React.FunctionComponent<
  ICustomMuiTableCellCheckboxProps
> = ({ selectedID, isItemSelected, handleRowSelection }) => {
  return (
    <TableCell size="small">
      <Stack direction="row" spacing={1}>
        <Checkbox
          checked={isItemSelected}
          color="primary"
          size="small"
          onClick={(ev) => handleRowSelection(ev, selectedID)}
          inputProps={{ "aria-labelledby": "labelId" }}
        />
      </Stack>
    </TableCell>
  );
};

export default CustomMuiTableCellCheckbox;
