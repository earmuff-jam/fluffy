import { FILTER_OPTIONS } from '@features/Reports/constants';

import { Button, Checkbox, FormControlLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

export default function ReportsFilterMenu({
  applyFilter,
  sinceValue,
  setSinceValue,
  includeOverdue,
  setIncludeOverdue,
}) {
  const handleSinceValue = (e) => {
    setSinceValue(e.target.value);
  };

  return (
    <Stack>
      <Typography variant="caption">Display reports for</Typography>
      <Select
        labelId="status-selector-labelId"
        id="status-selector"
        value={sinceValue}
        name={'Selected date time'}
        onChange={handleSinceValue}
        variant="standard"
      >
        {FILTER_OPTIONS.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
      <FormControlLabel
        sx={{ paddingTop: '1rem' }}
        control={
          <Checkbox checked={includeOverdue} onChange={() => setIncludeOverdue(!includeOverdue)} color="primary" />
        }
        label={<Typography variant="caption">Include overdue items</Typography>}
      />
      <Button disabled={sinceValue.length <= 0} onClick={applyFilter}>
        Submit
      </Button>
    </Stack>
  );
}
