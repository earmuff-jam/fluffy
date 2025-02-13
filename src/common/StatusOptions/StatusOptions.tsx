import * as React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { InfoOutlined } from "@mui/icons-material";
import { STATUS_OPTIONS } from "@common/StatusOptions/constants";

interface IStatusOptionsProps {
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const StatusOptions: React.FunctionComponent<IStatusOptionsProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="status-selector-label">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography>Overall status of assets within container</Typography>
          <Tooltip title="Overall status of assets within container. Individual items may contain different status than selected one for the category.">
            <InfoOutlined fontSize="small" />
          </Tooltip>
        </Stack>
      </InputLabel>

      <Select
        labelId="status-selector-labelId"
        id="status-selector"
        name="status"
        value={value}
        onChange={onChange}
        variant="standard"
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option.id} value={option.label}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusOptions;
