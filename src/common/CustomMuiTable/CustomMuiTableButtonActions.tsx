import * as React from "react";
import { IconButton, Stack, TableCell } from "@mui/material";
import { EditRounded, FileOpenRounded } from "@mui/icons-material";
import { SelectedAssetType } from "@features/categories/types";

interface ICustomMuiTableButtonActionsProps {
  row: SelectedAssetType;
  selectedID: string;
  hideIconButton: boolean;
  hideMoreDetailsButton: boolean;
  handleEdit: (id: string) => void;
  onRowSelect: (value: SelectedAssetType) => void;
}

const CustomMuiTableButtonActions: React.FunctionComponent<
  ICustomMuiTableButtonActionsProps
> = ({
  row,
  selectedID,
  hideIconButton,
  hideMoreDetailsButton,
  handleEdit,
  onRowSelect,
}) => {
  return (
    <TableCell>
      <Stack direction="row">
        {!hideIconButton && (
          <IconButton onClick={() => handleEdit(selectedID)} size="small">
            <EditRounded color="primary" fontSize="small" />
          </IconButton>
        )}
        {!hideMoreDetailsButton && (
          <IconButton size="small" onClick={() => onRowSelect(row)}>
            <FileOpenRounded color="primary" fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </TableCell>
  );
};

export default CustomMuiTableButtonActions;
