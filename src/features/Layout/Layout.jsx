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

import AppToolbar from '@features/Layout/AppToolbar/AppToolbar';
import MenuActionBar from '@features/Layout/MenuActionBar/MenuActionBar';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Layout = () => {
  const theme = useTheme();

  const profileDetails = {};
  const loading = false;

  const { user } = useAuthenticator();

  console.log(user);

  const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('sm'));
  const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up('lg'));

  const [openDrawer, setOpenDrawer] = useState(lgScreenSizeAndHigher ? true : false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  // useEffect(() => {
  //   dispatch(profileActions.getProfileDetails());
  //   dispatch(profileActions.getFavItems({ limit: 10 }));
  // }, []);

  if (loading) {
    return <Skeleton height="100vh" />;
  }

  return (
    <ThemeProvider theme={profileDetails.appearance ? darkTheme : lightTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="inherit" />
          </Box>
        }
      >
        <AppToolbar profileDetails={profileDetails} handleDrawerOpen={handleDrawerOpen} />
        <Stack sx={{ marginTop: '5rem', marginBottom: '1rem' }}>
          <MenuActionBar
            openDrawer={openDrawer}
            handleDrawerClose={handleDrawerClose}
            smScreenSizeAndHigher={smScreenSizeAndHigher}
            lgScreenSizeAndHigher={lgScreenSizeAndHigher}
          />
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Stack>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
