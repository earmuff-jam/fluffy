import { InfoOutlined } from '@mui/icons-material';

import { FormControl, InputLabel, MenuItem, Select, Stack, Tooltip, Typography } from '@mui/material';

import { STATUS_OPTIONS } from '@utils/constants';

export default function StatusOptions({ value, onChange, title = '', tooltipTitle = '', showTooltip = false }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="status-selector-label">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography>{title}</Typography>
          {showTooltip && (
            <Tooltip title={tooltipTitle}>
              <InfoOutlined fontSize="small" />
            </Tooltip>
          )}
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
}
