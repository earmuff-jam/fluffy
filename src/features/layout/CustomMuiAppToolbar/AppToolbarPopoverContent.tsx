import * as React from 'react';
import dayjs from 'dayjs';

import { Menu, MenuItem, Skeleton, Stack, Typography } from '@mui/material';
import { CircleRounded, DoneRounded } from '@mui/icons-material';
import EmptyComponent from '@utils/EmptyComponent';
import { ToolbarPopoverContentOptions } from '@features/layout/types';

interface IAppToolbarPopoverContentProps {
  loading: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  toggleReadOption: (firstArg: string, secondArg: boolean) => void;
  options: Array<ToolbarPopoverContentOptions>;
}

const AppToolbarPopoverContent: React.FunctionComponent<IAppToolbarPopoverContentProps> = ({
  loading,
  anchorEl,
  handleClose,
  toggleReadOption,
  options = [],
}) => {
  const open = Boolean(anchorEl);

  if (loading) return <Skeleton height="100%" />;

  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <Typography variant="h6" fontStyle="bold" sx={{ padding: '0rem 1rem' }}>
        Due Maintenance Plans
      </Typography>
      {(!options || options?.length <= 0) && (
        <EmptyComponent padding="1rem 1rem" subtitle="No new maintenance plans due." />
      )}

      {options?.map((option) => (
        <MenuItem
          key={option.id}
          disabled={option.is_read}
          onClick={() => {
            toggleReadOption(option.id, option.is_read);
            handleClose();
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {option.is_read ? (
              <DoneRounded sx={{ width: '0.7rem', height: '0.7rem', color: 'success.main' }} />
            ) : (
              <CircleRounded sx={{ width: '0.7rem', height: '0.7rem', color: 'error.main' }} />
            )}

            <Typography variant="caption">
              {option.name} is due {dayjs(option.plan_due).fromNow()}
            </Typography>
          </Stack>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AppToolbarPopoverContent;
