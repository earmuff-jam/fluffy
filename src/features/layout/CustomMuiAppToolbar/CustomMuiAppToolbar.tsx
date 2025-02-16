import * as React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { UserDemographicsType } from '@features/profile/types';
import CustomMuiAppToolbarTitle from '@features/layout/CustomMuiAppToolbar/CustomMuiAppToolbarTitle';
import CustomMuiAppToolbarActions from '@features/layout/CustomMuiAppToolbar/CustomMuiAppToolbarActions';

interface ICustomMuiAppToolbarProps {
    profileDetails: UserDemographicsType;
    handleDrawerOpen: () => void;
}

const CustomMuiAppToolbar: React.FunctionComponent<ICustomMuiAppToolbarProps> = ({ profileDetails, handleDrawerOpen }) => {
    return (
        <AppBar elevation={0}>
            <Toolbar sx={{ backgroundColor: 'accentColor.default' }}>
                <CustomMuiAppToolbarTitle onClick={handleDrawerOpen} />
                <CustomMuiAppToolbarActions profileDetails={profileDetails} />
            </Toolbar>
        </AppBar>
    );
};

export default CustomMuiAppToolbar;
