import * as React from 'react';

import { Badge, IconButton, Stack } from '@mui/material';
import { CircleNotifications } from '@mui/icons-material';
import { UserDemographicsType } from '@features/profile/types';


interface ICustomMuiAppToolbarActionsProps {
    profileDetails: UserDemographicsType,
}

const CustomMuiAppToolbarActions: React.FunctionComponent<ICustomMuiAppToolbarActionsProps> = ({ profileDetails }) => {

    const maintenanceNotifications = [];
    const loading = false;
    // const { maintenanceNotifications = [], loading } = useSelector((state) => state.profile);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const toggleReadOption = (id: string, toggleIsRead: boolean): void => {
        //   dispatch(profileActions.toggleMaintenanceNotificationReadOption({ maintenance_plan_id: id, is_read: !toggleIsRead }));
    };

    React.useEffect(() => {
        //   dispatch(profileActions.getMaintenanceNotifications());
    }, []);

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
};

export default CustomMuiAppToolbarActions;
