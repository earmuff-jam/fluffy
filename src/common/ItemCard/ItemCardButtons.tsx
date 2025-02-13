import * as React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { DeleteRounded, EditNoteRounded } from "@mui/icons-material";

interface IItemCardButtonsProps {
  id: string;
  handleDelete: (value: string) => void;
  handleEdit: (value: string) => void;
}

const ItemCardButtons: React.FunctionComponent<IItemCardButtonsProps> = ({
  id,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Stack direction="row">
      <Box>
        <IconButton size="small" onClick={() => handleDelete(id)}>
          <DeleteRounded fontSize="small" sx={{ color: "error.main" }} />
        </IconButton>
      </Box>
      <Box>
        <IconButton size="small" onClick={() => handleEdit(id)}>
          <EditNoteRounded fontSize="small" sx={{ color: "primary.main" }} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default ItemCardButtons;
