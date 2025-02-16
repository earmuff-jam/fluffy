import * as React from 'react';

import { Outlet } from 'react-router-dom';

import {
    Box,
    CircularProgress,
    Container,
    CssBaseline,
    Skeleton,
    Stack,
    ThemeProvider,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import LayoutOverheadBanner from '@features/layout/Banner';
import MenuActionBar from '@features/layout/MenuActionBar/MenuActionBar';
import { UserDemographicsType } from '@features/profile/types';
import CustomMuiAppToolbar from '@features/layout/CustomMuiAppToolbar/CustomMuiAppToolbar';


interface IAppLayoutProps {
}

const AppLayout: React.FunctionComponent<IAppLayoutProps> = (props) => {
    const theme = useTheme();
    const isVerifiedStr = localStorage.getItem('isVerified');
    const isVerified = isVerifiedStr === "true";

    const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('sm'));
    const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('lg'));

    const profileDetails: UserDemographicsType = {
        id: '',
        full_name: "",
        email_address: "",
        about_me: "",
        is_dark_theme: false,
        is_inventory_layout: false,
        online_status: false,
        phone_number: '',
        username: '',
        created_at: '',
        updated_at: ''
    };
    const loading = false;
    
    const [openDrawer, setOpenDrawer] = React.useState<boolean>(lgScreenSizeAndHigher ? true : false);

    const handleDrawerOpen = () => setOpenDrawer(true);
    const handleDrawerClose = () => setOpenDrawer(false);

    React.useEffect(() => {
        // dispatch(profileActions.getProfileDetails());
        // dispatch(profileActions.getFavItems({ limit: 10 }));
    }, []);

    if (loading) {
        return <Skeleton height="100vh" />;
    }

    return (
        <ThemeProvider theme={profileDetails.is_dark_theme ? darkTheme : lightTheme}>
            <CssBaseline />
            <React.Suspense
                fallback={
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                        <CircularProgress color="inherit" />
                    </Box>
                }
            >
                <CustomMuiAppToolbar profileDetails={profileDetails} handleDrawerOpen={handleDrawerOpen} />
                <Stack sx={{ marginTop: '5rem', marginBottom: '1rem' }}>
                    <MenuActionBar
                        openDrawer={openDrawer}
                        handleDrawerClose={handleDrawerClose}
                        smScreenSizeAndHigher={smScreenSizeAndHigher}
                        lgScreenSizeAndHigher={lgScreenSizeAndHigher}
                    />
                    <Container maxWidth="md">
                        <LayoutOverheadBanner
                            isVerified={isVerified}
                            revalidateEmail={() => {
                                // dispatch(authActions.revalidateEmail({ email: profileDetails?.email_address }))

                            }}
                        />
                        <Outlet />
                    </Container>
                </Stack>
            </React.Suspense>
        </ThemeProvider>

    );
};

export default AppLayout;
