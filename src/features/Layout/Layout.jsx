import { Suspense, useState } from 'react';

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
} from '@mui/material';

import { useTheme } from '@emotion/react';
import { darkTheme, lightTheme } from '@utils/Theme';
import { useAuthenticator } from '@aws-amplify/ui-react';
import AppToolbar from '@features/Layout/AppToolbar/AppToolbar';
import MenuActionBar from '@features/Layout/MenuActionBar/MenuActionBar';
import { useFetchUserProfileDetails } from '@services/profileApi';

const Layout = () => {
  const theme = useTheme();
  const { user } = useAuthenticator();

  const { data: profileDetails = {}, isLoading } = useFetchUserProfileDetails(user.userId);

  const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('sm'));
  const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('lg'));

  const [openDrawer, setOpenDrawer] = useState(lgScreenSizeAndHigher ? true : false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  if (isLoading) {
    return <Skeleton height="100vh" />;
  }

  return (
    <ThemeProvider theme={profileDetails?.appearance ? darkTheme : lightTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="inherit" />
          </Box>
        }
      >
        <AppToolbar profileDetails={profileDetails} handleDrawerOpen={handleDrawerOpen} />
        <Stack sx={{ marginTop: '5rem', marginBottom: '1rem', py: 10 }}>
          <MenuActionBar
            openDrawer={openDrawer}
            createdByUserId={user.userId}
            handleDrawerClose={handleDrawerClose}
            smScreenSizeAndHigher={smScreenSizeAndHigher}
            lgScreenSizeAndHigher={lgScreenSizeAndHigher}
          />
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Stack>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
