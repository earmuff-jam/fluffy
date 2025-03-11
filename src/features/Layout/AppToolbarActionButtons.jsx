import { useState } from 'react';

import { Badge, IconButton, Stack } from '@mui/material';
import { CircleNotifications } from '@mui/icons-material';

import AppToolbarPopoverContent from '@features/Layout/AppToolbarPopoverContent';
import AppToolBarMoreButtons from '@features/Layout/AppToolBarMoreButtons';

export default function AppToolbarActionButtons({ profileDetails }) {
  const loading = false;
  const maintenanceNotifications = [];
  // const { maintenanceNotifications = [], loading } = useSelector((state) => state.profile);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggleReadOption = (id, selection) => {
    // dispatch(profileActions.toggleMaintenanceNotificationReadOption({ maintenance_plan_id: id, is_read: !selection }));
  };

  // useEffect(() => {
  //   dispatch(profileActions.getMaintenanceNotifications());
  // }, []);

  return (
    <Stack direction="row" spacing="0.1rem">
      <IconButton size="small" onClick={handleClick} data-tour="overview-5">
        <Badge
          badgeContent={maintenanceNotifications?.filter((notification) => !notification?.is_read).length || 0}
          color="secondary"
        >
          <CircleNotifications />
        </Badge>
      </IconButton>
      <AppToolBarMoreButtons profileDetails={profileDetails} />
      <AppToolbarPopoverContent
        loading={loading}
        anchorEl={anchorEl}
        handleClose={handleClose}
        toggleReadOption={toggleReadOption}
        options={maintenanceNotifications}
      />
    </Stack>
  );
}
