import * as React from 'react';

import { Button, Checkbox, FormControlLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

import { FILTER_OPTIONS } from '@features/report/constants';
import { FilterOptionsType } from '@features/report/types';

interface IReportFilterMenuProps {
  handleClose: () => void;
  sinceValue: string;
  setSinceValue: (value: string) => void;
  includeOverdue: boolean;
  setIncludeOverdue: (value: boolean) => void;
}

const ReportFilterMenu: React.FunctionComponent<IReportFilterMenuProps> = ({
  handleClose,
  sinceValue,
  setSinceValue,
  includeOverdue,
  setIncludeOverdue,
}) => {
  const submit = () => {
    // dispatch(reportActions.getReports({ since: sinceValue, includeOverdue: includeOverdue }));
    // dispatch(inventoryActions.getAllInventoriesForUser({ since: sinceValue }));
    handleClose();
  };

  return (
    <Stack>
      <Typography variant="caption">Display reports for</Typography>
      <Select
        variant="standard"
        value={sinceValue}
        id="status-selector"
        name={'Selected date time'}
        labelId="status-selector-labelId"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSinceValue(ev.target.value)}
      >
        {FILTER_OPTIONS.map((option: FilterOptionsType) => (
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
      <Button disabled={sinceValue.length <= 0} onClick={submit}>
        Submit
      </Button>
    </Stack>
  );
};

export default ReportFilterMenu;
