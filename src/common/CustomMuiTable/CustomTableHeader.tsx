import * as React from "react";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AssetListColumnHeader } from "@utils/types";

interface ICustomTableHeaderProps {
  selectedIDList: string[];
  hideCheckBox: boolean;
  handleRowSelection: (
    ev: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => void;
  columns: AssetListColumnHeader[];
  showActions: boolean;
}

const CustomTableHeader: React.FunctionComponent<ICustomTableHeaderProps> = ({
  selectedIDList,
  hideCheckBox,
  handleRowSelection,
  columns,
  showActions,
}) => {
  return (
    <TableHead>
      <TableRow>
        {!hideCheckBox ? (
          <TableCell>
            <Checkbox
              size="small"
              checked={Boolean(selectedIDList?.length)}
              onClick={(ev) => handleRowSelection(ev, "all")}
            />
          </TableCell>
        ) : null}
        {Object.keys(columns).map((colKey) => {
          const column = columns[colKey];
          return (
            <TableCell key={column.id}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={"bold"}
              >
                {column.label}
              </Typography>
            </TableCell>
          );
        })}
        {showActions && (
          <TableCell>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={"bold"}
            >
              Actions
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
