import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Container, CssBaseline, Stack, ThemeProvider, useMediaQuery } from '@mui/material';

import { useTheme } from '@emotion/react';
import { darkTheme, lightTheme } from '@utils/Theme';

import Loading from '@utils/Loading';
import AppToolbar from '@features/Layout/AppToolbar';
import MenuActionBar from '@features/Layout/MenuActionBar';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useFetchUserProfileDetails } from '@services/profileApi';

const Layout = () => {
  const theme = useTheme();
  const { user } = useAuthenticator();

  const { data: profileDetails = {}, isLoading } = useFetchUserProfileDetails(user.userId);

  const greaterThanSmallFormFactor = useMediaQuery(theme.breakpoints.up('sm'));
  const greaterThanLargeFormFactor = useMediaQuery(theme.breakpoints.up('lg'));

  const [openDrawer, setOpenDrawer] = useState(greaterThanLargeFormFactor ? true : false);

  return (
    <ThemeProvider theme={profileDetails?.appearance ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppToolbar profileDetails={profileDetails} handleDrawerOpen={() => setOpenDrawer(true)} />
      <Stack
        sx={{
          marginTop: '5rem',
          marginBottom: '1rem',
          py: 2,
        }}
      >
        <MenuActionBar
          openDrawer={openDrawer}
          createdByUserId={user.userId}
          handleDrawerClose={() => setOpenDrawer(false)}
          greaterThanSmallFormFactor={greaterThanSmallFormFactor}
          greaterThanLargeFormFactor={greaterThanLargeFormFactor}
        />
        <Container maxWidth="xl">{isLoading ? <Loading /> : <Outlet />}</Container>
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;
